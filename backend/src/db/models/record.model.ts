import { Schema, Types, model, ObjectId } from "mongoose"
import { DBCollectionName } from "./db_collection_name"
import Doctor, { DoctorDocument } from "./doctor.model"
import Patient, { PatientDocument } from "./patient.model"

export enum RecordType {
    certificateOfDisability = "Arbeitsunfähigkeitsbescheinigung",
    medicalReport = "Arztbrief",
    diagnosticFindings = "Befund",
    prescription = "Rezept",
    referral = "Überweisung",
}

export interface RecordDocument extends Document {
    patient: PatientDocument
    doctor: DoctorDocument
    date: Date
    type: RecordType
    content: string
}

const RecordSchema: Schema<RecordDocument> = new Schema<RecordDocument>({
    patient: { type: String, ref: DBCollectionName.patients },
    doctor: { type: String, ref: DBCollectionName.doctors },
    date: { type: Date },
    type: { type: String },
    content: { type: String }
}, {
    autoCreate: true
});

const Record = model<RecordDocument>(DBCollectionName.records, RecordSchema);

export default Record;