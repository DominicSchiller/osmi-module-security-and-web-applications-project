import { Schema, Types, model } from "mongoose";
import User, {UserDocument} from "./user.model";
import Patient, {PatientDocument} from "./patient.model";
import { DBCollectionName } from "./db_collection_name";

export interface RepresentativeDocument extends Document {
    _id: string
    personalDetails: UserDocument
    representedPatients: PatientDocument[]
}

const RepresentativeSchema: Schema<RepresentativeDocument> = new Schema<RepresentativeDocument>({
    _id: {type: String},
    personalDetails: { type: Types.ObjectId, ref: User },
    representedPatients: [{ type: String, ref: Patient }]
}, {
    autoCreate: true
});

const Representative = model<RepresentativeDocument>(DBCollectionName.representatives, RepresentativeSchema);

export default Representative;