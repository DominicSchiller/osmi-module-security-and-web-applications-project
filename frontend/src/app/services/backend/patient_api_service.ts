import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of, Subject} from "rxjs";
import {catchError} from 'rxjs/operators';
import { HTTPStatusCode } from "src/app/interceptors/models/http-status-code.model";
import {HealthInsuranceDetails } from "src/app/models/health_insurance";
import {Patient} from "src/app/models/patient";
import {Record} from "src/app/models/record";
import { Representative } from "src/app/models/representative";
import { EpaKeycloakAccessLevel } from "../keycloak/epa-keycloak-access-level";
import { KeycloakService } from "../keycloak/keycloak.service";
import { RequestCacheService, RetryAction } from "../request-cache/request-cache.service";
import { BackendError, BackendErrorStatus } from "./models/backend.error.model";
import {PatientAPIEndpoint} from "./patent_api_endpoint";


@Injectable({
  providedIn: 'root'
})
export class PatientAPIService {
  private rootUrl = 'http://localhost:8686/api';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private onRetryActionSucceededSubject: Subject<RetryAction> = new Subject<RetryAction>()
  public onRetryActionSucceeded: Observable<RetryAction> = this.onRetryActionSucceededSubject.asObservable()

  constructor(
    private httpClient: HttpClient,
    private keycloakService: KeycloakService,
    private actionCache: RequestCacheService
  ) {}

  async performRetryActions(userId: string) { // TODO: generalize perform retry actions & try to relate required acr value to retry action
   let retryActions = this.actionCache.getRetryActions(userId)
    retryActions.forEach(action => {
      switch (action.actionId) {
        case PatientApiServiceAction.removeRepresentative:
          this.retryRemoveRepresentativeAction(action)
          break
        default:
          break // ignore
      }
    });
  }

  private async retryRemoveRepresentativeAction(action: RetryAction) {
    let currentAccessLevel = await this.keycloakService.currentAccessLevel()
    if (currentAccessLevel < EpaKeycloakAccessLevel.aal3) {
      this.actionCache.deleteRetryAction(action)
    }
    this.removeRepresentative(
      action.params.patientId,
      action.params.representativeId).subscribe(response => {
        this.actionCache.deleteRetryAction(action)
        this.keycloakService.refreshAccessLevel().then(() => {
          if (response) {
            this.onRetryActionSucceededSubject.next(action)
          }
        })
      })
  }

  getPatient(id: string): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.getUrl(PatientAPIEndpoint.patient)}/${id}`)
      .pipe(
        catchError(this.handleError<Patient>(`Get patient id=${id}`))
      );
  }

  getInsuranceDetails(patientId: string): Observable<HealthInsuranceDetails> {
    return this.httpClient.get<HealthInsuranceDetails>(`${this.getUrl(PatientAPIEndpoint.patient)}/${patientId}/${PatientAPIEndpoint.insuranceDetails}`)
      .pipe(
        catchError(this.handleError<HealthInsuranceDetails>(`Get health insurance details for patient with id=${patientId}`))
      );
  }

  getRepresentatives(patientId: string): Observable<Representative[]> {
    return this.httpClient.get<Representative[]>(`${this.getUrl(PatientAPIEndpoint.patient)}/${patientId}/${PatientAPIEndpoint.representatives}`)
      .pipe(
        catchError(this.handleError<Representative[]>(`Get representatives for patient with id=${patientId}`))
      );
  }

  removeRepresentative(patientId: string, representativeId: string): Observable<Patient> {
    return this.httpClient.delete<Patient>(
      `${this.getUrl(PatientAPIEndpoint.patient)}/${patientId}/${PatientAPIEndpoint.representatives}/${representativeId}`)
      .pipe(
        catchError(
          this.handleError<Patient>(
            `Remove representative with id=${representativeId} for patient with id=${patientId}`,
            new RetryAction(
              PatientApiServiceAction.removeRepresentative,
              patientId,
              {
                patientId: patientId,
                representativeId: representativeId
              })
          )
      ));
  }

  getRecords(patientId: string): Observable<Record[]> {
    return this.httpClient.get<Record[]>(`${this.getUrl(PatientAPIEndpoint.patient)}/${patientId}/${PatientAPIEndpoint.records}`)
      .pipe(
        catchError(this.handleError<Record[]>(`Get representatives for patient with id=${patientId}`))
      );
  }

  private getUrl(endpoint: PatientAPIEndpoint): string {
    return `${this.rootUrl}/${endpoint}`
  }

  private handleError<T>(errorMessage = 'operation', retryAction: RetryAction = null, result?: T) {
    return (error: HttpErrorResponse): Observable<T> => {
      let canStoreAction: boolean = false
      switch (error.status) {
        case HTTPStatusCode.unauthorized:
          canStoreAction = (error.error as BackendError[])
            .some(error => 
              error.status === BackendErrorStatus.aal2Required 
              || error.status === BackendErrorStatus.aal3Required)
              break
        default:
          canStoreAction = false
      }
      
      console.error(`${errorMessage} failed: ${error.message}`);

      if (canStoreAction) {
        this.actionCache.storeRetryAction(retryAction)
        return of(result as T);
      }
    };
  }
}

export enum PatientApiServiceAction {
  removeRepresentative = 'remove-representative'
}
