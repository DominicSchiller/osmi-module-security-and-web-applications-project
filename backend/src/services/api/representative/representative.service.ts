import { omit } from "lodash"
import { FilterQuery } from "mongoose"
import Representative, { RepresentativeDocument } from "../../../db/models/representative.model"
import log from "../../../logger/logger"

require('../../../db/models/address.model')

export async function findRepresentative(filterQuery: FilterQuery<RepresentativeDocument>): Promise<RepresentativeDocument> {
    try {
        // (3) fetch database data
        let representative = await Representative
            .findOne(filterQuery)
            .populate({
                path: 'personalDetails',
                populate: {
                    path: 'address'
                }
            })
            .lean() as RepresentativeDocument
        return omit(representative, ['patients']) as RepresentativeDocument
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}

export async function removePatient(filterQuery: FilterQuery<RepresentativeDocument>, patientId: string): Promise<boolean> {
    try {
        let result = await Representative
            .updateOne(filterQuery, {
                $pullAll: {
                    patient: [{_id: patientId }]
                }
            })
        return result.acknowledged
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}