import {Application} from "express";
import validateRequest from "../middleware/validateRequests";
import {findPatientHandler, findPatientInsuranceHandler, findPatientRecordsHandler, findPatientRepresentativesHandler, removePatientRepresentativeHandler} from "../controller/patients.controller";
import {OPAPolicyEndpoint} from "../services/opa/models/opa_policy_endpoint";
import {PatientRoutes} from "./patient.routes";
import { findPatientInsurancePrefetchHandler, findPatientPrefetchHandler, findPatientRecordsPrefetchHandler, findPatientRepresentativesPrefetchHandler, removePatientRepresentativePrefetchHandler } from "../controller/patient.prefetch.controller";

export default function(app: Application) {

    /*
    PATIENT API
     */
    app.get(
        PatientRoutes.getPatient,
        findPatientPrefetchHandler, 
        validateRequest(OPAPolicyEndpoint.getPatient), 
        findPatientHandler
    )

    app.get(
        PatientRoutes.getInsurance,
        findPatientInsurancePrefetchHandler, 
        validateRequest(OPAPolicyEndpoint.getPatientInsurance), 
        findPatientInsuranceHandler)

    app.get(
        PatientRoutes.getRepresentatives,
        findPatientRepresentativesPrefetchHandler, 
        validateRequest(OPAPolicyEndpoint.getPatientRepresentatives), 
        findPatientRepresentativesHandler)

    app.delete(
        PatientRoutes.removeRepresentative,
        removePatientRepresentativePrefetchHandler, 
        validateRequest(OPAPolicyEndpoint.removePatientRepresentative), 
        removePatientRepresentativeHandler
    )

    app.get(
        PatientRoutes.getRecords,
        findPatientRecordsPrefetchHandler, 
        validateRequest(OPAPolicyEndpoint.getPatientRecords), 
        findPatientRecordsHandler
    )
}