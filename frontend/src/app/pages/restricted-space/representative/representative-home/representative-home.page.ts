import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-representative-home',
  templateUrl: './representative-home.page.html',
  styleUrls: ['./representative-home.page.scss'],
})
export class RepresentativeHomePage implements OnInit {

  constructor(
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
  }

  public async logout() {
    await this.keycloakService.logout()
  }

}
