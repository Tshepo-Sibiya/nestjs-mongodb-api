import { CreateInvoiceSettingDto } from 'src/invoicing/dto/invoice-settings-dto/create-invoice-settings.dto';
import { InvoiceSettings } from 'src/invoicing/schemas/invoice-settings.schema';
import { InvoiceSettingsService } from 'src/invoicing/services/invoice-settings/invoice-settings.service';
export declare class InvoiceSettingsController {
    private invoiceSettingsService;
    constructor(invoiceSettingsService: InvoiceSettingsService);
    getInvoiceSettingsByUserId(req: any): Promise<import("mongoose").Document<unknown, {}, InvoiceSettings> & InvoiceSettings & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    create(newInvoiceData: CreateInvoiceSettingDto, req: any): Promise<InvoiceSettings>;
}
