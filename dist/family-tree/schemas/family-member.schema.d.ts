import mongoose, { Document } from 'mongoose';
import { Gender } from 'src/common/enums/gender.enum';
import { User } from 'src/user/schemas/user.schema';
export type FamilyMemberDetailsDocument = FamilyMemberDetails & Document;
export declare class FamilyMemberDetails extends Document {
    firstName: string;
    lastName: string;
    gender: Gender;
    birthDate: Date;
    deathDate: Date;
    generation: number;
    parents: FamilyMemberDetails[];
    children: FamilyMemberDetails[];
    notes: string;
    user: User;
}
export declare const FamilyMemberDetailsSchema: mongoose.Schema<FamilyMemberDetails, mongoose.Model<FamilyMemberDetails, any, any, any, mongoose.Document<unknown, any, FamilyMemberDetails> & FamilyMemberDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, FamilyMemberDetails, mongoose.Document<unknown, {}, mongoose.FlatRecord<FamilyMemberDetails>> & mongoose.FlatRecord<FamilyMemberDetails> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
