import {Injectable} from "@angular/core";
import * as KeycloakAngular from "keycloak-angular";
import {KeycloakEvent, KeycloakEventType} from "keycloak-angular";
import {KeycloakProfile} from 'keycloak-js';
import {BehaviorSubject, Observable} from "rxjs";
import {EpaKeycloakAccessLevel} from "./epa-keycloak-access-level";
import {KeycloakUserInfo} from "../backend/models/keycloak_user_info";
import {KeycloakUserRole} from "./keycloak-user-role";

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  //<editor-fold desc="Properties">
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private userInfoSubject: BehaviorSubject<KeycloakUserInfo> = new BehaviorSubject<KeycloakUserInfo>(null)

  public readonly isLoggedIn: Observable<boolean> = this.isLoggedInSubject.asObservable()
  public readonly userInfo: Observable<KeycloakUserInfo> = this.userInfoSubject.asObservable()

  //</editor-fold>

  //<editor-fold desc="Init">
  constructor(public keycloakService: KeycloakAngular.KeycloakService) {
    this.initKeycloakEventHandler()
  }
  //</editor-fold>

  //<editor-fold desc="Public API">

  public async logout() {
    return await this.keycloakService.logout("http://localhost:8787/public");
  }

  public async stepUp(accessLevel: EpaKeycloakAccessLevel) {
    await this.keycloakService.login({
      redirectUri: window.location.href,
      acr: { values: [accessLevel], essential: false }
    })
  }

  public async getToken() {
    try {
      let token = await this.keycloakService.getToken()
      console.info("Token received: ", token)
      return token
    } catch (error: any | unknown) {
      KeycloakService.handleError(error)
      return Promise.reject(error)
    }
    // let access_token = JSON.parse(atob(token.split('.')[1]));
    // this.isSteppedUp = access_token.acr == "aal2"
  }
  //</editor-fold>

  private async loadUserProfile() {
    this.userInfoSubject.next(new KeycloakUserInfo(
      await this.keycloakService.loadUserProfile(),
      this.getUserRole()
    ))
  }

  private getUserRole(): KeycloakUserRole {
    if (this.keycloakService.isUserInRole(KeycloakUserRole.patient)) {
      return KeycloakUserRole.patient
    }
    if (this.keycloakService.isUserInRole(KeycloakUserRole.doctor)) {
      return KeycloakUserRole.doctor
    }
    if (this.keycloakService.isUserInRole(KeycloakUserRole.representative)) {
      return KeycloakUserRole.representative
    }
    return KeycloakUserRole.unknown
  }

  private initKeycloakEventHandler() {
    this.keycloakService.keycloakEvents$.subscribe({
      next: async (event) => {
        this.handleKeycloakEvent(event)
        if (event.type == KeycloakEventType.OnAuthSuccess) {
          await this.keycloakService.updateToken(5);
        }
      }
    });
  }

  private handleKeycloakEvent(event: KeycloakEvent) {
    switch (event.type) {
      case KeycloakEventType.OnReady:
        this.handleKeycloakOnReady(event.args as boolean ?? false)
    }
  }

  private handleKeycloakOnReady(isLoggedIn: boolean) {
    this.isLoggedInSubject.next(isLoggedIn)

    if (!isLoggedIn) {
      if (this.userInfoSubject.value) {
        this.userInfoSubject.next(null)
      }
      return
    }
    this.loadUserProfile().then()
  }

  private static handleError(error: any | unknown) {
    console.error(error)
  }
}
