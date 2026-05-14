import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare class GymItem extends Document {
    name: string;
    description: string;
    isActive: boolean;
    user: User;
}
export declare const GymItemSchema: mongoose.Schema<GymItem, mongoose.Model<GymItem, any, any, any, mongoose.Document<unknown, any, GymItem> & GymItem & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, GymItem, mongoose.Document<unknown, {}, mongoose.FlatRecord<GymItem>> & mongoose.FlatRecord<GymItem> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
