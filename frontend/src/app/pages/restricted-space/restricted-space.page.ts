import {Component, OnInit} from '@angular/core';
import {Patient} from 'src/app/models/patient';
import {PatientAPIService} from 'src/app/services/backend/patient_api_service';
import {KeycloakService} from "../../services/keycloak/keycloak.service";
import {EpaKeycloakAccessLevel} from "../../services/keycloak/epa-keycloak-access-level";
import {BehaviorSubject, Observable} from "rxjs";
import {Router} from "@angular/router";
import {KeycloakUserRole} from "../../services/keycloak/keycloak-user-role";

@Component({
  selector: 'app-restricted-space',
  templateUrl: './restricted-space.page.html',
  styleUrls: ['./restricted-space.page.scss'],
})
export class RestrictedSpacePage implements OnInit {

  constructor(
    private keycloakService: KeycloakService,
    private router: Router
  ) {
  }

  public async ngOnInit() {
    this.keycloakService.userInfo.subscribe(userInfo => {
      switch (userInfo.role) {
        case KeycloakUserRole.patient:
          this.router.navigate(['/restricted-space/patient'], {
            queryParams: {id: userInfo.id}
          })
          break
        default:
          break
      }
    })
  }
}
