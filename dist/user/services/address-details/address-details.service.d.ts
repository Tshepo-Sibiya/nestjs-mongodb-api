import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { AddressDetails } from 'src/user/schemas/address-details.schema';
import { AddressDetailsDto } from 'src/user/dto/address-details.dto';
export declare class AddressDetailsService {
    private addressDetailsModel;
    private userModel;
    constructor(addressDetailsModel: Model<AddressDetails>, userModel: Model<User>);
    createOrUpdateAddressDetails(user: User, createAddressDetailsDto: AddressDetailsDto): Promise<AddressDetails>;
    GetUserAddressDetails(id: string): Promise<import("mongoose").Document<unknown, {}, AddressDetails> & AddressDetails & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}
