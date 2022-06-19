export class Opa_response {

    constructor(
        readonly decision_id: string,
        readonly result: OPAResult
    ) {}
}

export class OPAResult {
    constructor(
        readonly allow: boolean,
        readonly error?: OPAError
    ) {}
}

export class OPAError {
    constructor(
        readonly statusCode: OPAPolicyValidationErrorCode,
        readonly errorMessage: string
    ) {}
}

export enum OPAPolicyValidationErrorCode {
    badAccessToken
}