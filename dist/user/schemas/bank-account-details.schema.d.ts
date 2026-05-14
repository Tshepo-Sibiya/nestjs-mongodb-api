import { Document, Types } from 'mongoose';
export declare class BankAccountDetails extends Document {
    bankName: string;
    branch: string;
    branchCode: string;
    accountNumber: number;
    user: Types.ObjectId;
}
export declare const BankAccountDetailsSchema: import("mongoose").Schema<BankAccountDetails, import("mongoose").Model<BankAccountDetails, any, any, any, Document<unknown, any, BankAccountDetails> & BankAccountDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, BankAccountDetails, Document<unknown, {}, import("mongoose").FlatRecord<BankAccountDetails>> & import("mongoose").FlatRecord<BankAccountDetails> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
