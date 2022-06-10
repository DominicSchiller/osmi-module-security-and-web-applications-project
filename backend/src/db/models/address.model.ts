import {model, Schema, Types, Document } from 'mongoose';

interface AddressDocument extends Document {
    street: string;
    city: string;
    zipCode: string;
}

const AddressSchema = new Schema<AddressDocument>({
    street: { type: String, required: true },
    city: { type: String, required: true },
    zipCode: { type: String, required: true }
}, {
    autoCreate: true
});

const Address = model<AddressDocument>('Addresses', AddressSchema);

export default Address;
