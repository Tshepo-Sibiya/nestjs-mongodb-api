import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare class VatRate extends Document {
    rate: number;
    startDate: Date;
    endDate: Date;
    user: User;
}
export declare const VatRateSchema: mongoose.Schema<VatRate, mongoose.Model<VatRate, any, any, any, mongoose.Document<unknown, any, VatRate> & VatRate & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, VatRate, mongoose.Document<unknown, {}, mongoose.FlatRecord<VatRate>> & mongoose.FlatRecord<VatRate> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
