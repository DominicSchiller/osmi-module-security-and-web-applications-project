import {Request, Response} from "express";
import log from "../logger/logger";
import {OPAPolicyEndpoint} from "../services/opa/models/opa_policy_endpoint";
import {KeycloakUtils} from "../services/keycloak/utils/keycloak_utils";
import {KeycloakService} from "../services/keycloak/keycloak_service";
import {OPAService} from "../services/opa/opa_service";
import {OPARequestInputFactory} from "../services/opa/factories/opa_request_input_factory";

const validateRequest = (opaEndPoint: OPAPolicyEndpoint) => async (
    req: Request,
    res: Response
) => {
    try {
        // (1) verify keycloak access token
        let keycloakUserInfo = await KeycloakService.shared.getUserInfo(req)
        let opaResponse = await OPAService.shared.validate(
            OPARequestInputFactory.createInput(req, keycloakUserInfo, res.locals.fetchedData)
        )
        // (2) verify opa policies
        if (!opaResponse.result.authorization.isAllowed) {
            log.error(opaResponse.result.authorization.reasons)
            return Promise.reject(new Error(JSON.stringify(opaResponse.result.authorization)))
        }

        res.send(JSON.stringify(res.locals.fetchedData))
    } catch (error: any | unknown) {
        log.error(error);
        return res.status(400).send(JSON.stringify(error));
    }
}

export default validateRequest;