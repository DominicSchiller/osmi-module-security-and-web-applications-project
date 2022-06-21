import {NextFunction, Request, Response} from "express"
import {findPatient} from "../services/api/patient/patient.service";
import {PatientDocument} from "../db/models/patient.model";

export async function findPatientHandler(req: Request, res: Response, next: NextFunction) {
    try {
        res.locals.fetchedData = await findPatient({
            _id: req.body.patientId
        }) as PatientDocument
        next()
    } catch (error: any | unknown) {
        res.status(409).send(error.message);
    }
}