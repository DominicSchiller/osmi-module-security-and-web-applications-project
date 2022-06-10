import {Request, Response, NextFunction} from "express";
import log from "../logger/logger";

const validateRequest = (opaEndPoint: any) => async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        // TODO: await opa-policy-check
        return next()
    } catch (error: any | unknown) {
        log.error(error);
        return res.status(400).send(error.errors);
    }
}

export default validateRequest;