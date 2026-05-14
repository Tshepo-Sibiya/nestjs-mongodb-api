import mongoose, { Document } from 'mongoose';
import { RelationshipType } from '../enums/relationship-type.enum';
import { User } from 'src/user/schemas/user.schema';
export type RelationshipDetailsDocument = RelationshipDetails & Document;
export declare class RelationshipDetails extends Document {
    parentId: string;
    childId: string;
    relationshipType: RelationshipType;
    user: User;
}
export declare const RelationshipDetailsSchema: mongoose.Schema<RelationshipDetails, mongoose.Model<RelationshipDetails, any, any, any, mongoose.Document<unknown, any, RelationshipDetails> & RelationshipDetails & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, RelationshipDetails, mongoose.Document<unknown, {}, mongoose.FlatRecord<RelationshipDetails>> & mongoose.FlatRecord<RelationshipDetails> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
