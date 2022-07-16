import {Component, OnInit} from '@angular/core';
import {KeycloakService} from "../../services/keycloak/keycloak.service";
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
        case KeycloakUserRole.doctor:
          this.router.navigate(['/restricted-space/doctor'], {
            queryParams: {id: userInfo.id}
          })
          break
        case KeycloakUserRole.representative:
          this.router.navigate(['/restricted-space/representative'], {
            queryParams: {id: userInfo.id}
          })
          break
        default:
          break
      }
    })
  }
}
