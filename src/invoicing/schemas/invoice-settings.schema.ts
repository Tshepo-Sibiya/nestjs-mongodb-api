import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})
export class InvoiceSettings extends Document {
    @Prop({ required: true })
    id: number;

    @Prop({ required: true })
    companyRegNumber: string;

    @Prop({ required: true })
    companyVatNumber: string;

    @Prop({ required: true })
    companyName: string;

    @Prop({ required: true })
    companyAddressLineOne: string;

    @Prop()
    companyAddressLineTwo: string;

    @Prop({ required: true })
    companySuburb: string;

    @Prop({ required: true })
    companyCity: string;

    @Prop({ required: true })
    companyPostalCode: string;

    @Prop({ required: true })
    companyProvince: string;

    @Prop({ type: Buffer })
    companyLogo: Buffer;

    @Prop({ required: true })
    companyEmail: string;

    @Prop()
    yourCompanyAltEmail: string;

    @Prop({ required: true })
    companyTelephone: string;

    @Prop()
    companyAltTelephone: string;

    @Prop({ required: true })
    bank: string;

    @Prop({ required: true })
    branch: string;

    @Prop({ required: true })
    branchCode: string;

    @Prop({ required: true })
    accountNumber: string;

    @Prop()
    invoiceNotes: string;

    @Prop({ required: true })
    vatRate: number;

    @Prop({ required: true })
    useCustomVatRate: boolean;

    @Prop({ required: true })
    defaultVatRate: number;

    @Prop({ required: true })
    clientVatRate: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const InvoiceSettingsSchema = SchemaFactory.createForClass(InvoiceSettings);
