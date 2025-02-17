import {
    IsString,
    IsNotEmpty,
    IsEmail,
    MinLength,
    MaxLength,
    Matches,
    IsIn,
    IsNotIn,
    ValidateNested,
    IsOptional,
  } from 'class-validator';
  import { Type } from 'class-transformer';
import { BusinessProfileDto } from './business-profile.dto';
import { IndividualProfileDto } from './indidual-profile.dto';
  
  
  
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['individual', 'business'], {
      message: 'userType must be either individual or business',
    })
    userType: string;
  
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
      message:
        'Password must contain at least one uppercase letter, one number, and one special character.',
    })
    @MaxLength(20, { message: 'Password cannot be longer than 20 characters.' })
    @IsNotIn(['password', '123456', 'qwerty'], {
      message: 'Password is too common.',
    })
    readonly password: string;
  
    @ValidateNested()
    @Type(() => IndividualProfileDto)
    @IsOptional()
    individualProfile?: IndividualProfileDto;
  
    @ValidateNested()
    @Type(() => BusinessProfileDto)
    @IsOptional()
    businessProfile?: BusinessProfileDto;
  }
  