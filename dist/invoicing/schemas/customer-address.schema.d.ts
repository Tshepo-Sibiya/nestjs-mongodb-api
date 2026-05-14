import { Document } from 'mongoose';
export declare class InvoiceCustomerAddress extends Document {
    addressLineOne: string;
    addressLineTwo: string;
    province: string;
    city: string;
    postalCode: string;
}
export declare const InvoiceCustomerAddressSchema: import("mongoose").Schema<InvoiceCustomerAddress, import("mongoose").Model<InvoiceCustomerAddress, any, any, any, Document<unknown, any, InvoiceCustomerAddress> & InvoiceCustomerAddress & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, InvoiceCustomerAddress, Document<unknown, {}, import("mongoose").FlatRecord<InvoiceCustomerAddress>> & import("mongoose").FlatRecord<InvoiceCustomerAddress> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
