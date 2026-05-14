import { User } from 'src/user/schemas/user.schema';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';
import { VatRate } from 'src/invoicing/schemas/vat.schema';
import { Model } from 'mongoose';
export declare class VatRateService {
    private vatModel;
    private userModel;
    constructor(vatModel: Model<VatRate>, userModel: Model<User>);
    createOrUpdateQuote(user: User, createVatRateDto: VatDto): Promise<VatRate>;
    GetUserVatRateById(id: string): Promise<import("mongoose").Document<unknown, {}, VatRate> & VatRate & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
