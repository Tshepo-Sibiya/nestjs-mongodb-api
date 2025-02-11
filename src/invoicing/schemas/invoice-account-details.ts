import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';


@Schema({
    timestamps: true
})
export class InvoiceAccountDetails {

    @Prop({ required: true })
    bankName: string;

    @Prop({ required: true })
    branch: string;

    @Prop({ required: true })
    branchCode: string;

    @Prop({ required: true })
    accountNumber: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const InvoiceCustomerSchema = SchemaFactory.createForClass(InvoiceAccountDetails);