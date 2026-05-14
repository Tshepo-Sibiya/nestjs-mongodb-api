import { BusinessProfileDto } from './business-profile.dto';
import { IndividualProfileDto } from './indidual-profile.dto';
import { AddressDetailsDto } from './address-details.dto';
export declare class CreateUserDto {
    userType: string;
    readonly email: string;
    phoneNumber?: string;
    readonly password: string;
    individualProfile?: IndividualProfileDto;
    businessProfile?: BusinessProfileDto;
    addressDetails?: AddressDetailsDto;
}
