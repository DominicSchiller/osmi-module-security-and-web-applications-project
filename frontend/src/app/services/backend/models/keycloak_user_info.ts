import {KeycloakProfile} from "keycloak-js";
import {KeycloakUserRole} from "../../keycloak/keycloak-user-role";

export class KeycloakUserInfo implements KeycloakProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  enabled?: boolean;
  emailVerified?: boolean;
  totp?: boolean;
  createdTimestamp?: number;
  role: KeycloakUserRole

  constructor(profile: KeycloakProfile, role: KeycloakUserRole) {
    this.id = profile.id
    this.username = profile.username
    this.email = profile.email
    this.firstName = profile.firstName
    this.enabled = profile.enabled
    this.emailVerified = profile.emailVerified
    this.totp = profile.totp
    this.createdTimestamp = profile.createdTimestamp
    this.role = role
  }
}
