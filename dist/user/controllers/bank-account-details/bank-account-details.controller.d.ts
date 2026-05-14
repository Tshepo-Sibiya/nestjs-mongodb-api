import { BankAccountDetailsDto } from 'src/user/dto/bank-account-details.dto';
import { BankAccountDetailsService } from 'src/user/services/bank-account-details/bank-account-details.service';
export declare class BankAccountDetailsController {
    private bankAcccountDetailsService;
    constructor(bankAcccountDetailsService: BankAccountDetailsService);
    getBankAccountDetails(req: any): Promise<import("mongoose").Document<unknown, {}, import("../../schemas/bank-account-details.schema").BankAccountDetails> & import("../../schemas/bank-account-details.schema").BankAccountDetails & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOrUpdateBankAccountDetails(accountDetails: BankAccountDetailsDto, req: any): Promise<import("../../schemas/bank-account-details.schema").BankAccountDetails>;
}
