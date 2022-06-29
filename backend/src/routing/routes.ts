import {Application} from "express";
import validateRequest from "../middleware/validateRequests";
import {findPatientHandler, findPatientInsuranceHandler, findPatientRepresentativesHandler} from "../controller/patients.controller";
import {OPAPolicyEndpoint} from "../services/opa/models/opa_policy_endpoint";
import {PatientRoutes} from "./patient.routes";

export default function(app: Application) {

    /*
    PATIENT API
     */
    app.get(
        PatientRoutes.getPatient,
        findPatientHandler, validateRequest(OPAPolicyEndpoint.getPatient))

    app.get(
        PatientRoutes.getInsurance,
        findPatientInsuranceHandler, validateRequest(OPAPolicyEndpoint.getPatientInsurance))

    app.get(
        PatientRoutes.getRepresentatives,
        findPatientRepresentativesHandler, validateRequest(OPAPolicyEndpoint.getPatientRepresentatives))
}