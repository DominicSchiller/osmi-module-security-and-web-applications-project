export class BackendError {
    constructor(
        public message: string,
        public status: BackendErrorStatus
    ) {}
}

export enum BackendErrorStatus {
    badAccess = 1,
    aal2Required = 2,
    aal3Required = 3
}