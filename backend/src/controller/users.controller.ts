import {NextFunction, Request, Response} from "express"
import { omit } from "lodash";
import {UserDocument} from "../db/models/user.model";
import {createUser, findUser} from "../services/api/user/user.service";

export async function createUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        res.locals.user = await createUser(req.body);
        next()
        // return res.send(
        //     omit(user.toJSON(), "e-mail")
        // )
    } catch (error: any | unknown) {
        res.status(409).send(error.message)
    }
}

export async function findUserHandler(req: Request, res: Response, next: NextFunction) {
    try {
        res.locals.user = await findUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }) as UserDocument;
       next()
    } catch (error: any | unknown) {
        res.status(409).send(error.message);
    }
}