import { Request, Response } from "express"
import {createUser, findUser} from "../services/user.service";
import { omit } from "lodash";
import UserModel, {UserDocument} from "../db/models/user.model";

export async function createUserHandler(req: Request, res: Response) {
    try {
        const user = await createUser(req.body);
        return res.send(
            omit(user.toJSON(), "e-mail")
        )
    } catch (error: any | unknown) {
        res.status(409).send(error.message)
    }
}

export async function findUserHandler(req: Request, res: Response) {
    try {
        const user = await findUser({
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }) as UserDocument;
        return res.send(JSON.stringify(user))
    } catch (error: any | unknown) {
        res.status(409).send(error.message);
    }
}