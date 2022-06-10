import {Application, NextFunction, Request, Response} from "express";
import {createUserHandler, findUserHandler} from "./controller/users.controller";
import validateRequest from "./middleware/validateRequests";

export default function(app: Application) {

    app.get("/", (req: Request, res: Response, next: NextFunction) => {
        res.send("Hello World")
    })

    app.post(
        "api/users",
        validateRequest("some-opa-endpoint"), createUserHandler)

    app.get(
        "/api/user",
        validateRequest("some-opa.endpoint"), findUserHandler)
}