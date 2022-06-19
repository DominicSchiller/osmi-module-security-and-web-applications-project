import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../../db/models/user.model";
import log from "../../logger/logger";
import {KeycloakService} from "../keycloak/keycloak_service";
import {KeycloakUtils} from "../keycloak/utils/keycloak_utils";
import {OPAService} from "../opa/opa_service";
import {OPARequestInputFactory} from "../opa/factories/opa_request_input_factory";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input)
    } catch (error: any | unknown) {
        throw new Error(error);
    }
}

export async function findUser(filterQuery: FilterQuery<UserDocument>, authorizationHeader: string) {
    try {
        // (1) verify keycloak access token
        let accessToken = KeycloakUtils.getAccessTokenFromAuthorizationHeader(authorizationHeader)
        let keycloakUserInfo = await KeycloakService.shared.getUserInfo(authorizationHeader)
        let opaResponse = await OPAService.shared.validateGetUser(
            OPARequestInputFactory.createGetUserInput(keycloakUserInfo, accessToken!)
        )
        // (2) verify opa policies
        if (!opaResponse.result.authorization.isAllowed) {
            log.error(opaResponse.result.authorization.reasons)
            return Promise.reject(new Error(JSON.stringify(opaResponse.result.authorization)))
        }
        // (3) fetch database data
        return User.findOne(filterQuery).lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}