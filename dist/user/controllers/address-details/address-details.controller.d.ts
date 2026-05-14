import { AddressDetailsDto } from 'src/user/dto/address-details.dto';
import { AddressDetailsService } from 'src/user/services/address-details/address-details.service';
export declare class AddressDetailsController {
    private bankAcccountDetailsService;
    constructor(bankAcccountDetailsService: AddressDetailsService);
    getBankAccountDetails(req: any): Promise<import("mongoose").Document<unknown, {}, import("../../schemas/address-details.schema").AddressDetails> & import("../../schemas/address-details.schema").AddressDetails & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
    createOrUpdateAddressDetails(addressDetails: AddressDetailsDto, req: any): Promise<import("../../schemas/address-details.schema").AddressDetails>;
}
