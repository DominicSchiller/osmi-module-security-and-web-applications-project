import {NextFunction, Request, Response} from "express"
import {findInsurance, findPatient} from "../services/api/patient/patient.service";
import {HealthInsuranceDetails, PatientDocument} from "../db/models/patient.model";

export async function findPatientHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId } = req.params;
        res.locals.fetchedData = await findPatient({
            _id: patientId
        }) as PatientDocument
        next()
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}

export async function findPatientInsuranceHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId } = req.params;
        res.locals.fetchedData = await findInsurance({
            _id: patientId
        }) as HealthInsuranceDetails
        next()
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}