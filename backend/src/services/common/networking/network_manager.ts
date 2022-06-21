import {firstValueFrom, Observable} from "rxjs";
import {Response} from "@rxjsx/request/lib/models";
import log from "../../../logger/logger";

export default class NetworkManger {

    private constructor() { /* Plain static class */ }

    static async sendRequest<Result>(request: Observable<Response<Result>>): Promise<Result> {
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
}