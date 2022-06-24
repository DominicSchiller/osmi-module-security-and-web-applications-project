import {Application} from "express";
import validateRequest from "./middleware/validateRequests";
import {findPatientHandler} from "./controller/patients.controller";
import {OPAPolicyEndpoint} from "./services/opa/models/opa_policy_endpoint";

export default function(app: Application) {

    app.get(
        "/api/patient",
        findPatientHandler, validateRequest(OPAPolicyEndpoint.getPatient))
}