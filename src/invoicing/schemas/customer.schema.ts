import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { CustomerAddress } from './customer-address.schema';

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

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'CustomerAddress' })
    address: CustomerAddress;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);





