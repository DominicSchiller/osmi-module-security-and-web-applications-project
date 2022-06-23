import { Schema, Types, Document, model } from 'mongoose';
import {UserDocument} from "./user.model";
import {DBCollectionName} from "./db_collection_name";
import {PatientDocument} from "./patient.model";
import {HealthFacilityDocument} from "./health_facility.model";

export interface DoctorDocument extends Document {
    _id: string
    personalDetails: UserDocument
    discipline: string
    facility: HealthFacilityDocument
    patients: [PatientDocument]
}

const DoctorSchema = new Schema<DoctorDocument>({
    _id: {type: String},
    personalDetails: { type: Types.ObjectId, ref: DBCollectionName.users },
    discipline: { type: String, required: true },
    facility: { type: Types.ObjectId, ref: DBCollectionName.healthFacilities },
    patients: [{ type: Types.ObjectId, ref: DBCollectionName.patients }]
}, {
    autoCreate: true
});

const Doctor = model<DoctorDocument>(DBCollectionName.doctors, DoctorSchema);

export default Doctor;