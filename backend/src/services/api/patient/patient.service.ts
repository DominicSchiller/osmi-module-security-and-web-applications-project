import {FilterQuery} from "mongoose";
import {KeycloakUtils} from "../../keycloak/utils/keycloak_utils";
import {KeycloakService} from "../../keycloak/keycloak_service";
import {OPAService} from "../../opa/opa_service";
import {OPARequestInputFactory} from "../../opa/factories/opa_request_input_factory";
import log from "../../../logger/logger";
import Patient, {PatientDocument} from "../../../db/models/patient.model";

export async function findPatient(filterQuery: FilterQuery<PatientDocument>): Promise<PatientDocument> {
    try {
        // (3) fetch database data
        return Patient
            .findOne(filterQuery)
            .populate('user')
            .lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}