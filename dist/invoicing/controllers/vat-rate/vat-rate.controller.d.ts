import { VatRateService } from 'src/invoicing/services/vat/vat-rate.service';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';
export declare class VatRateController {
    private vatRateService;
    constructor(vatRateService: VatRateService);
    getUserSettings(req: any): Promise<import("mongoose").Document<unknown, {}, import("../../schemas/vat.schema").VatRate> & import("../../schemas/vat.schema").VatRate & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOrUpdateUserVatRate(vatRate: VatDto, req: any): Promise<import("../../schemas/vat.schema").VatRate>;
}
