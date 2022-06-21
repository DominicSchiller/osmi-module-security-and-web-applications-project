import {KeycloakUserInfo} from "../../keycloak/models/user_info";
import {Request} from "express";
import {IncomingHttpHeaders} from "http";

export interface OPARequestInput {
    input: OPAInputData
}
export interface OPAInputData {
    attributes: OPAAttributesData
    keycloak: OPAKeycloakUserInfoData
    fetchedData: any
}

export interface OPAAttributesData {
    request: OPAIncomingRequestData
}

export interface OPAIncomingRequestData {
    url: string
    httpVersion: string,
    originalUrl: string,
    body: any,
    headers: IncomingHttpHeaders
}

export interface OPAKeycloakUserInfoData {
    user_info: KeycloakUserInfo
}

