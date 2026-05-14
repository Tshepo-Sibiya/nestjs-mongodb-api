import { Document, Types } from 'mongoose';
export type AddressDetailsDocument = AddressDetails & Document;
export declare class AddressDetails extends Document {
    lineOne: string;
    lineTwo: string;
    suburb: string;
    city: string;
    province: string;
    country: string;
    postalCode: number;
    user: Types.ObjectId;
}
export declare const AddressDetailsSchema: import("mongoose").Schema<AddressDetails, import("mongoose").Model<AddressDetails, any, any, any, Document<unknown, any, AddressDetails> & AddressDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, AddressDetails, Document<unknown, {}, import("mongoose").FlatRecord<AddressDetails>> & import("mongoose").FlatRecord<AddressDetails> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
