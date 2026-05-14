import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { BankAccountDetailsDto } from 'src/user/dto/bank-account-details.dto';
import { BankAccountDetails } from 'src/user/schemas/bank-account-details.schema';
export declare class BankAccountDetailsService {
    private accountDetailsModel;
    private userModel;
    constructor(accountDetailsModel: Model<BankAccountDetails>, userModel: Model<User>);
    createOrUpdateBankAccountDetails(user: User, createBankAcccountDetailsDto: BankAccountDetailsDto): Promise<BankAccountDetails>;
    GetBankAcccountDetailsById(id: string): Promise<import("mongoose").Document<unknown, {}, BankAccountDetails> & BankAccountDetails & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
