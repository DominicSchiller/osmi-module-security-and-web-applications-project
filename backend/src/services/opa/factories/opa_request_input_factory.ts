import {KeycloakUserInfo} from "../../keycloak/models/user_info";
import {OPARequestInput} from "../models/opa_request_input";
import {Request} from "express";

export class OPARequestInputFactory {

    private constructor() {/* plain static class */}

    static createInput(req: Request, keycloakUserInfo: KeycloakUserInfo, fetchedData: any): OPARequestInput {
        return {
            input: {
                attributes: {
                    request: {
                        url: req.url,
                        httpVersion: req.httpVersion,
                        originalUrl: req.originalUrl,
                        body: req.body,
                        headers: req.headers
                    }
                },
                keycloak: {
                    user_info: keycloakUserInfo
                },
                fetchedData: fetchedData
            }
        }
    }

}