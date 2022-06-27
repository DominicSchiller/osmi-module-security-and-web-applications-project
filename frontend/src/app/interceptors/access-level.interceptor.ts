import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, EMPTY, MonoTypeOperatorFunction, Observable, of, Subject, throwError } from "rxjs";
import { catchError, concatMap, retryWhen } from "rxjs/operators";
import { BackendError, BackendErrorStatus } from "../services/backend/models/backend.error.model";
import { EpaKeycloakAccessLevel } from "../services/keycloak/epa-keycloak-access-level";
import { KeycloakService } from "../services/keycloak/keycloak.service";
import { HTTPStatusCode } from "./models/http-status-code.model";

@Injectable()
export class AccessLevelInterceptor implements HttpInterceptor {

    constructor(
        private keycloakService: KeycloakService
    ) {}

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(
                retryWhen(error => this.retryRequest(error, 3)),
                catchError((error: HttpErrorResponse) => {
                    return throwError(error)
                })
            )
    }

    private retryRequest(httpEvent: Observable<unknown>, retryCount: number): Observable<unknown> {
        return httpEvent.pipe(
            concatMap((errorResponse: HttpErrorResponse, count: number) => { // count == index
                if (errorResponse.status == HTTPStatusCode.unauthorized && count < retryCount) {
                    return new Observable(subscriber => {
                        if (this.performSteupUpAuthentication(errorResponse)) {
                            subscriber.next(of(errorResponse))
                            subscriber.complete()
                            return
                        }
                        subscriber.error(errorResponse)
                    })
                }
                return throwError(errorResponse)
            })
        )
    }

    private performSteupUpAuthentication(errorResponse: HttpErrorResponse): boolean {
        let errors = errorResponse.error as BackendError[]
        if (!errors) {
            console.error("wrong error type")
            return false
        }
        let requiredAccessLevel = errors.some(error => error.status === BackendErrorStatus.aal2Required) ? 
            EpaKeycloakAccessLevel.aal2
            : null
        if (requiredAccessLevel) {
            this.keycloakService.stepUp(requiredAccessLevel)
        }
    }
}