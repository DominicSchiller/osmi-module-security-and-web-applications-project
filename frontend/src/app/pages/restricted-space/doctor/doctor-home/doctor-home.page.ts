import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "../../../../services/keycloak/keycloak.service";

@Component({
  selector: 'app-doctor-home',
  templateUrl: './doctor-home.page.html',
  styleUrls: ['./doctor-home.page.scss'],
})
export class DoctorHomePage implements OnInit {

  constructor(
    private keycloakService: KeycloakService
  ) { }

  ngOnInit() {
  }

  public async logout() {
    await this.keycloakService.logout()
  }

}
