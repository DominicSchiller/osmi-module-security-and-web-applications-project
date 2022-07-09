import {NextFunction, Request, Response} from "express"
import {findPatient} from "../services/api/patient/patient.service";
import {PatientDocument} from "../db/models/patient.model";
import { prefetchFindRepresentative } from "../services/api/representative/representative.prefetch.service";
import { RepresentativeDocument } from "../db/models/representative.model";

export async function findPatientPrefetchHandler(req: Request, res: Response, next: NextFunction) {
    next()
}

export async function findPatientInsurancePrefetchHandler(req: Request, res: Response, next: NextFunction) {
   next()
}

export async function findPatientRepresentativesPrefetchHandler(req: Request, res: Response, next: NextFunction) {
    next()
}

export async function findPatientRecordsPrefetchHandler(req: Request, res: Response, next: NextFunction) {
    next()
}

export async function removePatientRepresentativePrefetchHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const { patientId, representativeId } = req.params;
        let patient = await findPatient({
            _id: patientId
        }) as PatientDocument
        let representative = await prefetchFindRepresentative({
            _id: representativeId
        }) as RepresentativeDocument

        res.locals.fetchedData = {
            patient: patient,
            representative: representative
        }
        next()
    } catch (error: any | unknown) {
        res.status(400).send(error.message);
    }
}