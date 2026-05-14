import { Model } from 'mongoose';
import { CreateInvoiceSettingDto } from 'src/invoicing/dto/invoice-settings-dto/create-invoice-settings.dto';
import { InvoiceSettings } from 'src/invoicing/schemas/invoice-settings.schema';
import { User } from 'src/user/schemas/user.schema';
export declare class InvoiceSettingsService {
    private invoiceSettingsModel;
    private userModel;
    constructor(invoiceSettingsModel: Model<InvoiceSettings>, userModel: Model<User>);
    getInvoiceSettingsByUserId(id: string): Promise<import("mongoose").Document<unknown, {}, InvoiceSettings> & InvoiceSettings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOrUpdateInvoiceSettings(user: User, settingsDto: CreateInvoiceSettingDto): Promise<InvoiceSettings>;
}
