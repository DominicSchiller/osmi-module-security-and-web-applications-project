import { Request } from "express"

export class KeycloakUtils {

    private constructor() { /* plain static class */ }

    static getAccessTokenFromRequest(req: Request) {
        if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
            return req.headers.authorization.split(' ')[1];
        }
        return null;
    }

    static getAccessTokenFromAuthorizationHeader(authorizationHeader: string) {
        if (authorizationHeader.split(' ')[0] === 'Bearer') {
            return authorizationHeader.split(' ')[1];
        }
        return null;
    }
}