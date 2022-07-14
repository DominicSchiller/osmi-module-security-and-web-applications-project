import {OPAPolicyEndpoint} from "./models/opa_policy_endpoint";
import log from "../../logger/logger";
import {request} from "@rxjsx/request";
import {OPAResponse} from "./models/opa_response";
import {OPARequestInput} from "./models/opa_request_input";
import NetworkManger from "../common/networking/network_manager";


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
    private readonly rootUrl: string
    private readonly port: number
    private readonly epaPocDataPath: string = "v1/data/epapoc"

    //</editor-fold>

    //<editor-fold desc="Init">
    private constructor() {
        switch (process.env.NODE_ENV) {
            case 'production':
                this.rootUrl = 'http://opa'
                this.port = 8181
                break
            default:
                this.rootUrl = 'http://localhost'
                this.port = 8282
                break
        }
    }
    //</editor-fold>

    //<editor-fold desc="Keycloak API">
    async validate(endpoint: OPAPolicyEndpoint, requestInput: OPARequestInput): Promise<OPAResponse> {
        try {
            return await NetworkManger.sendRequest(
                request.post<OPARequestInput, OPAResponse>(
                    this.getUrl(endpoint),
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
    //</editor-fold>
}