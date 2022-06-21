import {KeycloakUserInfo} from "../../keycloak/models/user_info";

export interface OPARequestInput {
    input: OPAInputData
}
export interface OPAInputData {
    access_token: string,
    keycloak: OPAKeycloakUserInfoData
    fetchedData: any
}

export interface OPAKeycloakUserInfoData {
    user_info: KeycloakUserInfo
}

