import {FilterQuery} from "mongoose";
import log from "../../../logger/logger";
import Patient, {HealthInsuranceDetails, PatientDocument} from "../../../db/models/patient.model";
import { omit } from "lodash";

require('../../../db/models/health_insurance.model')
require('../../../db/models/address.model')

export async function findPatient(filterQuery: FilterQuery<PatientDocument>): Promise<PatientDocument> {
    try {
        // (3) fetch database data
        let patient = await Patient
            .findOne(filterQuery)
            .populate({
                path: 'personalDetails',
                populate: {
                    path: 'address'
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

export async function findInsurance(filterQuery: FilterQuery<HealthInsuranceDetails>): Promise<HealthInsuranceDetails> {
    try {
        // (3) fetch database data
        let patient: PatientDocument = await Patient
            .findOne(filterQuery)
            .select('healthInsurance')
            .populate({
                path: 'healthInsurance',
                populate: {
                    path: 'company',
                    populate: {
                        path: 'address'
                    }
                }
            })
            .lean()
        if (patient.healthInsurance) {
            return patient.healthInsurance as HealthInsuranceDetails
        }
        return {} as HealthInsuranceDetails
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}