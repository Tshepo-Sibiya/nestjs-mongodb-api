import { Document, Types } from 'mongoose';
export declare class Settings extends Document {
    biometricsOn: boolean;
    companyLogo: Buffer;
    user: Types.ObjectId;
}
export declare const SettingsSchema: import("mongoose").Schema<Settings, import("mongoose").Model<Settings, any, any, any, Document<unknown, any, Settings> & Settings & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Settings, Document<unknown, {}, import("mongoose").FlatRecord<Settings>> & import("mongoose").FlatRecord<Settings> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
