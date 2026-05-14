import { Document, Types } from 'mongoose';
export type InvoiceSettingsDocument = InvoiceSettings & Document;
export declare class InvoiceSettings extends Document {
    companyName: string;
    registrationNumber: string;
    vatNumber: string;
    vatRate: string;
    emailAddress: string;
    telephone: string;
    invoiceNotes: string;
    accountNumber: string;
    bankName: string;
    branchName: string;
    branchCode: string;
    addressLineOne: string;
    addressLineTwo: string;
    suburb: string;
    city: string;
    province: string;
    country: string;
    postalCode: string;
    user: Types.ObjectId;
}
export declare const InvoiceSettingsSchema: import("mongoose").Schema<InvoiceSettings, import("mongoose").Model<InvoiceSettings, any, any, any, Document<unknown, any, InvoiceSettings> & InvoiceSettings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoiceSettings, Document<unknown, {}, import("mongoose").FlatRecord<InvoiceSettings>> & import("mongoose").FlatRecord<InvoiceSettings> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
