import { Schema, Types, Document, model } from 'mongoose';
import {AddressDocument} from "./address.model";
import {DBCollectionName} from "./db_collection_name";

enum Gender {
    male = "male",
    female = "female"
}

export interface UserDocument extends Document {
    title: string;
    firstName: string;
    lastName: string;
    age: number;
    gender: Gender;
    address: AddressDocument;
    email: string;
    phone: string;
    birthday: Date;
}

export const UserSchema = new Schema<UserDocument>({
    title: { type: String, required: false },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: Types.ObjectId, ref: DBCollectionName.addresses },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birthday: { type: Date, required: true }
}, {
    autoCreate: true
});

const User = model<UserDocument>(DBCollectionName.users, UserSchema);

export default User;