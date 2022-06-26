import { Component, OnInit } from '@angular/core';
import { KeycloakEventType, KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { Patient } from 'src/app/models/patient';
import { PatientAPIService } from 'src/app/services/backend/patient_api_service';

@Component({
  selector: 'app-restricted-space',
  templateUrl: './restricted-space.page.html',
  styleUrls: ['./restricted-space.page.scss'],
})
export class RestrictedSpacePage implements OnInit {

  public isLoggedIn = false;
  public isSteppedUp = false 
  public userProfile: Patient
  
  constructor(
    private keycloakService: KeycloakService,
    private patientApiService: PatientAPIService
    ) {}

   public async ngOnInit() {
    this.isLoggedIn = await this.keycloakService.isLoggedIn();

    if (this.isLoggedIn) {
      let keycloakUserProfile = await this.keycloakService.loadUserProfile();

      if (keycloakUserProfile.id) {
        this.patientApiService.getPatient(keycloakUserProfile.id!)
          .subscribe( patient => {
            this.userProfile = patient
          })
      }
      
    }

    this.keycloakService.getToken()
      .then(token => {
        console.info("Token received: ", token)

        let access_token = JSON.parse(atob(token.split('.')[1]));
        this.isSteppedUp = access_token.acr == "aal2"
      })
      .catch(error => {
        console.error(error)
      })

      this.keycloakService.keycloakEvents$.subscribe({
        next: (e) => {
          if (e.type == KeycloakEventType.OnAuthSuccess) {
            this.keycloakService.updateToken(5);
          }
        }
      });
  }

  public async stepUp(acr: string) {
    await this.keycloakService.login({
      redirectUri: window.location.origin + "/restricted-space",
      acr: { values: [acr], essential: false }
    })
  }

  public logout() {
    this.keycloakService.logout("http://localhost:8787/public");
  }

  public username(): string {
    return this.userProfile.personalDetails.firstName + " " + this.userProfile.personalDetails.lastName
  }

}
