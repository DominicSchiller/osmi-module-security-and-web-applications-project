import { Schema, Types, Document, model } from 'mongoose';

enum Gender {
    male = "male",
    female = "female"
}

export interface UserDocument extends Document {
    firstName: string;
    lastName: string;
    age: number;
    gender: string;
    address: Types.ObjectId;
    email: string;
    phone: string;
    birthday: Date;
};

const UserSchema = new Schema<UserDocument>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    address: { type: Schema.Types.ObjectId, ref: 'Addresses' },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    birthday: { type: Date, required: true }
}, {
    autoCreate: true
});

const User = model<UserDocument>('Users', UserSchema);

export default User;