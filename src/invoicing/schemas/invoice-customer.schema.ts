import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Address } from './customer-address.schema';

@Schema()
export class InvoiceCustomer extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ default: false })
    archive: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Address' })
    address: Address;
}

export const InvoiceCustomerSchema = SchemaFactory.createForClass(InvoiceCustomer);





