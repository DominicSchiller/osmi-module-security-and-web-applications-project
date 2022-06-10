import { DocumentDefinition, FilterQuery } from "mongoose";
import User, { UserDocument } from "../db/models/user.model";
import log from "../logger/logger";

export async function createUser(input: DocumentDefinition<UserDocument>) {
    try {
        return await User.create(input)
    } catch (error: any | unknown) {
        throw new Error(error);
    }
}

export async function findUser(filterQuery: FilterQuery<UserDocument>) {
    try {
        return User.findOne(filterQuery).lean()
    } catch (error: any | unknown) {
        log.error(error)
        throw new Error(error);
    }
}