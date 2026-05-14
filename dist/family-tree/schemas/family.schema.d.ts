import mongoose, { Document } from 'mongoose';
import { FamilyMemberDetails } from './family-member.schema';
import { User } from 'src/user/schemas/user.schema';
export type FamilyDetailsDocument = FamilyDetails & Document;
export declare class FamilyDetails extends Document {
    familyName: string;
    clanName: string;
    language: string;
    familyMembers: FamilyMemberDetails[];
    user: User;
}
export declare const FamilyDetailsSchema: mongoose.Schema<FamilyDetails, mongoose.Model<FamilyDetails, any, any, any, mongoose.Document<unknown, any, FamilyDetails> & FamilyDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, FamilyDetails, mongoose.Document<unknown, {}, mongoose.FlatRecord<FamilyDetails>> & mongoose.FlatRecord<FamilyDetails> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
