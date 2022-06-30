import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError, retry, tap} from 'rxjs/operators';
import { HealthInsurance, HealthInsuranceDetails } from "src/app/models/health_insurance";
import {Patient} from "src/app/models/patient";
import { Representative } from "src/app/models/representative";
import { EpaKeycloakAccessLevel } from "../keycloak/epa-keycloak-access-level";
import { KeycloakService } from "../keycloak/keycloak.service";
import { RequestCacheService, RetryAction } from "../request-cache/request-cache.service";
import {PatientAPIEndpoint} from "./patent_api_endpoint";


@Injectable({
  providedIn: 'root'
})
export class PatientAPIService {
  private rootUrl = 'http://localhost:8686/api';

  private httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(
    private httpClient: HttpClient,
    private keycloakService: KeycloakService,
    private actionCache: RequestCacheService
  ) {
  }

  performRetryActions(userId: string) { // TODO: generalize perform retry actions & try to relate required acr value to retry action
   let retryActions = this.actionCache.getRetryActions(userId)
    retryActions.forEach(action => {
      console.warn("Will perform", action)
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
    let currentAccessLevel = await this.keycloakService.getCurrentAccessLevel()
    if (currentAccessLevel < EpaKeycloakAccessLevel.aal3) {
      this.actionCache.deleteRetryAction(action)
      return
    }
    this.removeRepresentative(
      action.params.patientId,
      action.params.representativeId).subscribe(response => {
        this.actionCache.deleteRetryAction(action)
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

  private getUrl(endpoint: PatientAPIEndpoint): string {
    return `${this.rootUrl}/${endpoint}`
  }

  private handleError<T>(errorMessage = 'operation', retryAction: RetryAction = null, result?: T) {
    return (error: any): Observable<T> => {
      this.actionCache.storeRetryAction(retryAction)
      console.error(`${errorMessage} failed: ${error.message}`);
      return of(result as T);
    };
  }
}

export enum PatientApiServiceAction {
  removeRepresentative = 'remove-representative'
}
