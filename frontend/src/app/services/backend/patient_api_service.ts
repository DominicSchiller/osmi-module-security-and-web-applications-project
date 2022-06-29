import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable, of} from "rxjs";
import {catchError, tap} from 'rxjs/operators';
import { HealthInsurance, HealthInsuranceDetails } from "src/app/models/health_insurance";
import {Patient} from "src/app/models/patient";
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
    private httpClient: HttpClient
  ) {
  }

  getPatient(id): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.getUrl(PatientAPIEndpoint.getPatient)}/${id}`)
      .pipe(
        catchError(this.handleError<Patient>(`Get patient id=${id}`))
      );
  }

  getInsuranceDetails(id): Observable<HealthInsuranceDetails> {
    return this.httpClient.get<HealthInsuranceDetails>(`${this.getUrl(PatientAPIEndpoint.getPatient)}/${id}/${PatientAPIEndpoint.getInsurance}`)
      .pipe(
        catchError(this.handleError<HealthInsuranceDetails>(`Get patient id=${id}`))
      );
  }

  private getUrl(endpoint: PatientAPIEndpoint): string {
    return `${this.rootUrl}/${endpoint}`
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}