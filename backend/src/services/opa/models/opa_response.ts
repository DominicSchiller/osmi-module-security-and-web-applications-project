export class OPAResponse {

    constructor(
        readonly decision_id: string,
        readonly result: OPAResponseResult
    ) {}
}

export interface OPAResponseResult {
    authorization: OPAAuthorizationResult
}

export interface OPAAuthorizationResult {
    isAllowed: boolean
    reasons?: []
}

export interface OPAAuthorizationDeniedReason {
    status: OPAAuthorizationDeniedStatus
    message: string
}

export enum OPAAuthorizationDeniedStatus {
    badAccessToken
}