import {FilterQuery} from "mongoose";
import log from "../../../logger/logger";
import Patient, {PatientDocument} from "../../../db/models/patient.model";
import { omit } from "lodash";

export async function findPatient(filterQuery: FilterQuery<PatientDocument>): Promise<PatientDocument> {
    try {
        // (3) fetch database data
        let patient = await Patient
            .findOne(filterQuery)
            .populate('personalDetails')
            .populate({
                path: 'healthInsurance', 
                populate: {
                    path: 'company'
                }
            })
            // .populate({
            //     path: 'doctors', 
            //     populate: {
            //         path: 'personalDetails'
            //     }
            // })
            .lean() as PatientDocument
        
        return omit(patient, ['healthInsurance', 'bodyPhysics'])
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}