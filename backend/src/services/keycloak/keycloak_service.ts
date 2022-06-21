import {request} from '@rxjsx/request';
import {KeycloakEndpoint} from "./keycloak_endpoint";
import log from "../../logger/logger";
import {firstValueFrom, Observable} from "rxjs";
import {KeycloakUserInfo} from "./models/user_info";
import {Response} from "@rxjsx/request/lib/models";
import NetworkManger from "../common/networking/network_manager";

export class KeycloakService {

    //<editor-fold desc="Singleton">
    private static instance: KeycloakService;

    static get shared(): KeycloakService {
        if (this.instance) {
            return this.instance
        }
        this.instance = new KeycloakService()
        return this.instance
    }
    //</editor-fold>

    //<editor-fold desc="Properties">
    private rootUrl: string = "http://localhost"
    private port: number = 8181
    private epaPoCRealm: string = "realms/epa-poc"

    //</editor-fold>

    //<editor-fold desc="Init">
    private constructor() {}
    //</editor-fold>

    //<editor-fold desc="Keycloak API">
    async getUserInfo(authorizationHeader: string): Promise<KeycloakUserInfo> {
        try {
            return await NetworkManger.sendRequest(
                request.get<KeycloakUserInfo>(this.getUrl(KeycloakEndpoint.userInfo), {
                    Authorization: authorizationHeader
                })
            )
        } catch (error: any | unknown) {
            log.error(error)
            throw error
        }
    }
    //</editor-fold>

    private getUrl(endpoint: KeycloakEndpoint): string {
        return `${this.rootUrl}:${this.port}/${this.epaPoCRealm}/${endpoint}`
    }
}
