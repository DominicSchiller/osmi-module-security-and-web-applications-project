import {KeycloakUserInfo} from "../../keycloak/models/user_info";
import {OPAGetUserInputData, OPARequestInput} from "../models/opa_request_input";

export class OPARequestInputFactory {

    private constructor() {/* plain static class */}

    static createGetUserInput(keycloakUserInfo: KeycloakUserInfo, accessToken: string): OPARequestInput<OPAGetUserInputData> {
        return {
            "input": {
                "access_token": accessToken,
                "keycloak": {
                    "user_info": keycloakUserInfo
                }
            }
        }
    }

}