import { BusinessProfileDto } from './business-profile.dto';
import { IndividualProfileDto } from './indidual-profile.dto';
export declare class UpdateUserDto {
    userType: string;
    individualProfile?: IndividualProfileDto;
    businessProfile?: BusinessProfileDto;
}
