import {FilterQuery} from "mongoose";
import log from "../../../logger/logger";
import Patient, {HealthInsuranceDetails, PatientDocument} from "../../../db/models/patient.model";
import { omit } from "lodash";
import Representative, { RepresentativeDocument } from "../../../db/models/representative.model";
import { RecordDocument } from "../../../db/models/record.model";

require('../../../db/models/health_insurance.model')
require('../../../db/models/doctor.model')
require('../../../db/models/address.model')
require('../../../db/models/user.model')

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

export async function findInsurance(filterQuery: FilterQuery<PatientDocument>): Promise<HealthInsuranceDetails> {
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

export async function findAllRepresentatives(filterQuery: FilterQuery<PatientDocument>): Promise<RepresentativeDocument[]> {
    try {
        // (3) fetch database data
        let patient: PatientDocument = await Patient
            .findOne(filterQuery)
            .select('representatives')
            .populate({
                path: 'representatives',
                populate: {
                    path: 'personalDetails',
                    populate: {
                        path: 'address'
                    }
                }
            })
            .lean()
        if (patient.representatives) {
            return patient.representatives as RepresentativeDocument[]
        }
        return [] as RepresentativeDocument[]
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}

export async function removeRepresentative(filterQuery: FilterQuery<PatientDocument>, representativeId: string): Promise<boolean> {
    try {
        let result = await Patient
            .updateOne(filterQuery, {
                $pullAll: {
                    representatives: [{_id: representativeId }]
                }
            })
        return result.acknowledged
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}

export async function findAllRecords(filterQuery: FilterQuery<RecordDocument>): Promise<RecordDocument[]> {
    try {
        // (3) fetch database data
        let patient: PatientDocument = await Patient
            .findOne(filterQuery)
            .select('records')
            .populate({
                path: 'records',
                populate: {
                    path: 'doctor',
                    populate: {
                        path: 'personalDetails',
                        populate: {
                            path: 'address'
                        }
                    }
                }
            })
            .lean()
        if (patient.records) {
            return patient.records as RecordDocument[]
        }
        return [] as RecordDocument[]
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}