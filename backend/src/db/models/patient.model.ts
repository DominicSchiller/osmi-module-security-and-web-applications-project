import { Schema, Types, Document, model } from 'mongoose';
import User, {UserDocument} from "./user.model";
import HealthInsurance, {HealthInsuranceDocument} from "./health_insurance.model";
import {DBCollectionName} from "./db_collection_name";
import Doctor, {DoctorDocument} from "./doctor.model";

export interface BodyPhysics {
    bloodType: string,
    weight: number,
    height: number
}

export interface HealthInsuranceDetails {
    company: HealthInsuranceDocument,
    insuranceNumber: number
}

export interface PatientDocument extends Document {
   _id: string
    personalDetails: UserDocument
    healthInsurance: HealthInsuranceDetails
    bodyPhysics: BodyPhysics
    doctors: [DoctorDocument]
}

const HealthInsuranceSchema = new Schema<HealthInsuranceDetails>({
    company: { type: Types.ObjectId, ref: HealthInsurance },
    insuranceNumber: { type: Number, required: true }
})

const PatientSchema = new Schema<PatientDocument>({
    _id: {type: String},
    personalDetails: { type: Types.ObjectId, ref: User },
    healthInsurance: { type: HealthInsuranceSchema },
    bodyPhysics: { type: Object, required: true },
    doctors: [{ type: String, ref: Doctor }]
}, {
    autoCreate: true
});

const Patient = model<PatientDocument>(DBCollectionName.patients, PatientSchema);

export default Patient;