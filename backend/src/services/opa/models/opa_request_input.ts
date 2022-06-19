import {KeycloakUserInfo} from "../../keycloak/models/user_info";

export interface OPARequestInput<T> {
    input: T
}
export interface OPAGetUserInputData {
    access_token: string,
    keycloak: OPAKeycloakUserInfoData
}

export interface OPAKeycloakUserInfoData {
    user_info: KeycloakUserInfo
}

