import { Schema, Types, Document, model } from 'mongoose';
import {AddressDocument} from "./address.model";
import {DBCollectionName} from "./db_collection_name";

export interface HealthInsuranceDocument extends Document {
    name: string
    group: string
    address: AddressDocument
}

export const HealthInsuranceSchema = new Schema<HealthInsuranceDocument>({
    name: { type: String, required: false },
    group: { type: String, required: true },
    address: { type: Types.ObjectId, ref: DBCollectionName.addresses },
}, {
    autoCreate: true
});

const HealthInsurance = model<HealthInsuranceDocument>(DBCollectionName.healthInsurances, HealthInsuranceSchema);

export default HealthInsurance;