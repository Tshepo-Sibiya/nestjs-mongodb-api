import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
import { InvoiceCustomerAddress, InvoiceCustomerAddressSchema } from './customer-address.schema';

@Schema({
    timestamps: true
})
export class Customer extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ default: false })
    archived: boolean;

    // embedded address details
    @Prop({ type: InvoiceCustomerAddressSchema, default: {} })
    address?: InvoiceCustomerAddress;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
