import {NextFunction, Request, Response} from "express";
import log from "../logger/logger";
import {OPAPolicyEndpoint} from "../services/opa/models/opa_policy_endpoint";
import {KeycloakService} from "../services/keycloak/keycloak_service";
import {OPAService} from "../services/opa/opa_service";
import {OPARequestInputFactory} from "../services/opa/factories/opa_request_input_factory";

const validateRequest = (opaEndPoint: OPAPolicyEndpoint) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // (1) verify keycloak access token
        let keycloakUserInfo = await KeycloakService.shared.getUserInfo(req)
        let opaResponse = await OPAService.shared.validate(
            opaEndPoint,
            OPARequestInputFactory.createInput(req, keycloakUserInfo, res.locals.fetchedData)
        )
        // (2) verify opa policies
        if (!opaResponse.result.isAllowed) {
            log.error(opaResponse.result.reasons)
            return res.status(401).send(opaResponse.result.reasons)
        }
        next()
    } catch (error: any | unknown) {
        log.error(error);
        return res.status(401).send(error);
    }
}

export default validateRequest;