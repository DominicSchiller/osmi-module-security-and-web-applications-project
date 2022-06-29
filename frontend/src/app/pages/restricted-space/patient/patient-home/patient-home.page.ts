import {Component, OnInit} from '@angular/core';
import {PatientAPIService} from "../../../../services/backend/patient_api_service";
import {BehaviorSubject, Observable} from "rxjs";
import {Patient} from "../../../../models/patient";
import {ActivatedRoute, Router} from "@angular/router";
import {EpaKeycloakAccessLevel} from "../../../../services/keycloak/epa-keycloak-access-level";
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";
// import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-patient-home',
  templateUrl: './patient-home.page.html',
  styleUrls: ['./patient-home.page.scss'],
})
export class PatientHomePage implements OnInit {

  private patientId: string

  private userProfileSubject: BehaviorSubject<Patient> = new BehaviorSubject<Patient>(null)
  userProfile: Observable<Patient> = this.userProfileSubject.asObservable()

  constructor(
    private router: Router,
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
            this.patientId = params.id
            this.loadPatient()
          }
      });
  }

  private loadPatient() {
    this.patientApiService.getPatient(this.patientId)
      .subscribe(patient => {
        this.userProfileSubject.next(patient)
      })
  }


  public showInsuranceDetails() {
    this.router.navigate(['/restricted-space/patient/insurance-details'], {
      queryParams: {patientId: this.patientId}
    })
  }

  public showRepresentativesOverview() {
    this.router.navigate(['/restricted-space/patient/representatives-overview'], {
      queryParams: {patientId: this.patientId}
    })
  }

  public async logout() {
    await this.keycloakService.logout()
  }

  public get username() {
    let person = this.userProfileSubject.value.personalDetails
    return `${person.firstName} ${person.lastName}`
  }

}
