import { Schema, Types, Document, model } from 'mongoose';
import {UserDocument} from "./user.model";

export interface PatientDocument extends Document {
   _id: string
    user: UserDocument
}

const PatientSchema = new Schema<PatientDocument>({
    user: {type: Schema.Types.ObjectId, ref: 'Users'},
}, {
    autoCreate: true
});

const Patient = model<PatientDocument>('Patients', PatientSchema);

export default Patient;