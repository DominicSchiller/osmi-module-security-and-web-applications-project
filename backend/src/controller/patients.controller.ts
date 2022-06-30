import {NextFunction, Request, Response} from "express"
import {findAllRepresentatives, findInsurance, findPatient, removeRepresentative} from "../services/api/patient/patient.service";
import {HealthInsuranceDetails, PatientDocument} from "../db/models/patient.model";
import { RepresentativeDocument } from "../db/models/representative.model";
import { removePatient } from "../services/api/representative/representative.service";

export async function findPatientHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId } = req.params;
        let patient = await findPatient({
            _id: patientId
        }) as PatientDocument
        res.status(200).send(JSON.stringify(patient))
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}

export async function findPatientInsuranceHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId } = req.params;
        let insuranceDetails = await findInsurance({
            _id: patientId
        }) as HealthInsuranceDetails
        res.status(200).send(JSON.stringify(insuranceDetails))
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}

export async function findPatientRepresentativesHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId } = req.params;
        let representatives = await findAllRepresentatives({
            _id: patientId
        }) as RepresentativeDocument[]
        res.status(200).send(JSON.stringify(representatives))
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}

export async function removePatientRepresentativeHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId, representativeId } = req.params;

        let isRepresentativeRemoved = await removeRepresentative({
            _id: patientId
        }, representativeId)

        let isPatientRemoved = await removePatient({
            _id: representativeId
        }, patientId)

        let isSuccess = isRepresentativeRemoved && isPatientRemoved
        res.status(isSuccess ? 200 : 500).send(isSuccess)
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}