import { Document, Types } from 'mongoose';
export type IndividualDocument = Individual & Document;
export declare class Individual {
    firstName: string;
    lastName: string;
    title: string;
    initials: string;
    dateOfBirth: Date;
    user: Types.ObjectId;
}
export declare const IndividualSchema: import("mongoose").Schema<Individual, import("mongoose").Model<Individual, any, any, any, Document<unknown, any, Individual> & Individual & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Individual, Document<unknown, {}, import("mongoose").FlatRecord<Individual>> & import("mongoose").FlatRecord<Individual> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
