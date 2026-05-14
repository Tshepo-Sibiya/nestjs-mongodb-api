import { SettingsService } from 'src/user/services/settings/settings.service';
import { CreateSettingsDto } from 'src/user/dto/create-settings.dto';
import { Settings } from 'src/user/schemas/settings.schema';
export declare class SettingsController {
    private settingsService;
    constructor(settingsService: SettingsService);
    createOrUpdateSettings(settings: CreateSettingsDto, req: any): Promise<Settings>;
    getUserSettings(req: any): Promise<import("mongoose").Document<unknown, {}, Settings> & Settings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
