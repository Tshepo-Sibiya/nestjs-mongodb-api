import { Document, Types } from 'mongoose';
export type BusinessDocument = Business & Document;
export declare class Business {
    businessName: string;
    registrationNumber: string;
    vatNumber: string;
    contactPerson: string;
    user: Types.ObjectId;
}
export declare const BusinessSchema: import("mongoose").Schema<Business, import("mongoose").Model<Business, any, any, any, Document<unknown, any, Business> & Business & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Business, Document<unknown, {}, import("mongoose").FlatRecord<Business>> & import("mongoose").FlatRecord<Business> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
