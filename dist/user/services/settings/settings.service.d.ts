import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { Query } from 'express-serve-static-core';
import { CreateSettingsDto } from 'src/user/dto/create-settings.dto';
import { Settings } from 'src/user/schemas/settings.schema';
export declare class SettingsService {
    private settingsModel;
    private userModel;
    constructor(settingsModel: Model<Settings>, userModel: Model<User>);
    createOrUpdateSettings(user: User, settingsDto: CreateSettingsDto): Promise<Settings>;
    GetSettingsById(id: string): Promise<import("mongoose").Document<unknown, {}, Settings> & Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    findAll(query: Query): Promise<Settings[]>;
}
