export interface OPAResponse {
    decision_id: string,
    result: OPAResponseResult
}

export interface OPAResponseResult {
    isAllowed: boolean
    reasons?: OPAAuthorizationDeniedReason[]
}

export interface OPAAuthorizationDeniedReason {
    status: OPAAuthorizationDeniedStatus
    message: string
}

export enum OPAAuthorizationDeniedStatus {
    badAccessToken
}