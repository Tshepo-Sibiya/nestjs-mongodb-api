import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare class GymSession extends Document {
    date: Date;
    duration: number;
    notes?: string;
    status: 'completed' | 'scheduled' | 'cancelled';
    user: User;
}
export declare const GymSessionSchema: mongoose.Schema<GymSession, mongoose.Model<GymSession, any, any, any, mongoose.Document<unknown, any, GymSession> & GymSession & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, GymSession, mongoose.Document<unknown, {}, mongoose.FlatRecord<GymSession>> & mongoose.FlatRecord<GymSession> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
