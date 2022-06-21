import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../../../db/models/user.model";
import log from "../../../logger/logger";
import {KeycloakService} from "../../keycloak/keycloak_service";
import {KeycloakUtils} from "../../keycloak/utils/keycloak_utils";
import {OPAService} from "../../opa/opa_service";
import {OPARequestInputFactory} from "../../opa/factories/opa_request_input_factory";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input)
    } catch (error: any | unknown) {
        throw new Error(error);
    }
}

export async function findUser(filterQuery: FilterQuery<UserDocument>) {
    try {
        // (3) fetch database data
        return User.findOne(filterQuery).lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}