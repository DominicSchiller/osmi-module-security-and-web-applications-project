import {KeycloakUserInfo} from "../../keycloak/models/user_info";
import {OPARequestInput} from "../models/opa_request_input";

export class OPARequestInputFactory {

    private constructor() {/* plain static class */}

    static createInput(keycloakUserInfo: KeycloakUserInfo, accessToken: string, fetchedData: any): OPARequestInput {
        return {
            input: {
                access_token: accessToken,
                keycloak: {
                    user_info: keycloakUserInfo
                },
                fetchedData: fetchedData
            }
        }
    }

}