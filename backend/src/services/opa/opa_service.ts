import {OPAPolicyEndpoint} from "./models/opa_policy_endpoint";
import {firstValueFrom, Observable} from "rxjs";
import {Response} from "@rxjsx/request/lib/models";
import log from "../../logger/logger";
import {request} from "@rxjsx/request";
import {Opa_response} from "./models/opa_response";
import {OPAGetUserInputData, OPARequestInput} from "./models/opa_request_input";
import {KeycloakUserInfo} from "../keycloak/models/user_info";


export class OPAService {
    //<editor-fold desc="Singleton">
    private static instance: OPAService;

    static get shared(): OPAService {
        if (this.instance) {
            return this.instance
        }
        this.instance = new OPAService()
        return this.instance
    }
    //</editor-fold>

    //<editor-fold desc="Properties">
    private rootUrl: string = "http://localhost"
    private port: number = 8282
    private epaPocDataPath: string = "v1/data/epapoc"

    //</editor-fold>

    //<editor-fold desc="Init">
    private constructor() {}
    //</editor-fold>

    //<editor-fold desc="Keycloak API">
    async validateGetUser(requestInput: OPARequestInput<OPAGetUserInputData>): Promise<Opa_response> {
        try {
            return await OPAService.sendRequest(
                request.post<OPARequestInput<OPAGetUserInputData>, Opa_response>(
                    this.getUrl(OPAPolicyEndpoint.getUser),
                    requestInput
                )
            )
        } catch (error: any | unknown) {
            log.error(error)
            throw error
        }
    }
    //</editor-fold>

    //<editor-fold desc="Helper Functions">
    private getUrl(policyEndpoint: OPAPolicyEndpoint): string {
        return `${this.rootUrl}:${this.port}/${this.epaPocDataPath}/${policyEndpoint}`
    }

    private static async sendRequest<Result>(request: Observable<Response<Result>>): Promise<Result> {
        try {
            let response: Response<Result> = await firstValueFrom(request)
            if (response === undefined) {
                return Promise.reject(Error("No response received"))
            }
            if (response.statusCode! >= 400) {
                return Promise.reject(Error(response.body))
            }
            return response.json()
        } catch (error: any | unknown) {
            log.error(error)
            throw error
        }
    }
    //</editor-fold>
}