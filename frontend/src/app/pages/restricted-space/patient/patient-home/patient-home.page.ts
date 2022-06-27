import {Component, OnInit} from '@angular/core';
import {PatientAPIService} from "../../../../services/backend/patient_api_service";
import {BehaviorSubject, Observable} from "rxjs";
import {Patient} from "../../../../models/patient";
import {ActivatedRoute} from "@angular/router";
import {EpaKeycloakAccessLevel} from "../../../../services/keycloak/epa-keycloak-access-level";
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
// import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.page.html',
  styleUrls: ['./patient-home.page.scss'],
})
export class PatientHomePage implements OnInit {

  private userProfileSubject: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null)
  userProfile: Observable<Patient> = this.userProfileSubject.asObservable()

  constructor(
    private route: ActivatedRoute,
    private patientApiService: PatientAPIService,
    private keycloakService: KeycloakService
  ) {
  }

  ngOnInit() {
    this.route.queryParams
      // .filter(params => params.order)
      .subscribe(params => {
          if (params.id) {
            this.loadPatient(params.id)
          }
        }
      );
  }

  private loadPatient(patientId: string) {
    this.patientApiService.getPatient(patientId)
      .subscribe(patient => {
        this.userProfileSubject.next(patient)
      })
  }


  public async stepUp(acr: string) {
    await this.keycloakService.stepUp(EpaKeycloakAccessLevel.aal2)
  }

  public async logout() {
    await this.keycloakService.logout()
  }

  public username() {
    let person = this.userProfileSubject.value.personalDetails
    return `${person.firstName} ${person.lastName}`
  }

}
