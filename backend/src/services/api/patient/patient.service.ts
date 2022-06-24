import {FilterQuery} from "mongoose";
import log from "../../../logger/logger";
import Patient, {PatientDocument} from "../../../db/models/patient.model";

export async function findPatient(filterQuery: FilterQuery<PatientDocument>): Promise<PatientDocument> {
    try {
        // (3) fetch database data
        return Patient
            .findOne(filterQuery)
            .populate('personalDetails')
            .populate({
                path: 'healthInsurance', 
                populate: {
                    path: 'company'
                }
            })
            .populate({
                path: 'doctors', 
                populate: {
                    path: 'personalDetails'
                }
            })
            .lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}