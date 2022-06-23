import { Schema, Types, Document, model } from 'mongoose';
import {AddressDocument} from "./address.model";
import {DBCollectionName} from "./db_collection_name";

export interface HealthFacilityDocument extends Document {
    _id: string
    name: string
    address: AddressDocument
}

const HealthFacilitySchema = new Schema<HealthFacilityDocument>({
    name: { type: String, required: false },
    address: { type: Types.ObjectId, ref: DBCollectionName.addresses },
}, {
    autoCreate: true
});

const HealthFacility = model<HealthFacilityDocument>(DBCollectionName.healthFacilities, HealthFacilitySchema);

export default HealthFacility;