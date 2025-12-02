import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type InvoiceSettingsDocument = InvoiceSettings & Document;

@Schema({
    timestamps: true
})
export class InvoiceSettings extends Document {

    

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    registrationNumber: string;

    @Prop({ required: true })
    vatNumber: string;

    @Prop({ default: false })
    vatRate: string;

    @Prop({ required: true })
    emailAddress: string;

    @Prop({ required: false })
    telephone: string;

    @Prop({ required: false })
    invoiceNotes: string;

    @Prop({ required: false })
    accountNumber: string;

    @Prop({ required: false })
    bankName: string;

    @Prop({ required: false })
    branchName: string;

    @Prop({ required: false })
    branchCode: string;

    @Prop({ required: false })
    addressLineOne: string;

    @Prop({ required: false })
    addressLineTwo: string;

    @Prop({ required: false })
    suburb: string;

    @Prop({ required: false })
    city: string;

    @Prop({ required: false })
    province: string;

    @Prop({ required: false })
    country: string;

    @Prop({ required: false })
    postalCode: string;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;

}

export const InvoiceSettingsSchema = SchemaFactory.createForClass(InvoiceSettings);





