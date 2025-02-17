import {
    IsString,
    IsNotEmpty,
    IsIn,
    IsNotIn,
    ValidateNested,
    IsOptional,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { BusinessProfileDto } from './business-profile.dto';
import { IndividualProfileDto } from './indidual-profile.dto';
  
  
  
export class UpdateUserDto {

    @IsString()
    @IsNotEmpty()
    @IsIn(['individual', 'business'], {
      message: 'userType must be either individual or business',
    })
    userType: string;

    @ValidateNested()
    @Type(() => IndividualProfileDto)
    @IsOptional()
    individualProfile?: IndividualProfileDto;
  
    @ValidateNested()
    @Type(() => BusinessProfileDto)
    @IsOptional()
    businessProfile?: BusinessProfileDto;

}


