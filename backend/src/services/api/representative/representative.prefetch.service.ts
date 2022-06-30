import { FilterQuery } from "mongoose"
import Representative, { RepresentativeDocument } from "../../../db/models/representative.model"
import log from "../../../logger/logger"

require('../../../db/models/address.model')

export async function prefetchFindRepresentative(filterQuery: FilterQuery<RepresentativeDocument>): Promise<RepresentativeDocument> {
    try {
        // (3) fetch database data
        return await Representative
            .findOne(filterQuery)
            .populate({
                path: 'personalDetails',
                populate: {
                    path: 'address'
                }
            })
            .lean() as RepresentativeDocument
    } catch (error: any | unknown) {
        log.error(error)
        throw error
    }
}