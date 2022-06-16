import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../db/models/user.model";
import log from "../logger/logger";
import {KeycloakService} from "../keycloak/keycloak_service";
import {KeycloakUtils} from "../keycloak/utils/keycloak_utils";

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
        // TODO: (2) check OPA policies
        // (3) fetch database data
        return User.findOne(filterQuery).lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}