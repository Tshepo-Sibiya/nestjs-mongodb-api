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
import { ApiProperty } from '@nestjs/swagger';
import { AddressDetailsDto } from './address-details.dto';
  
  
  
  
  export class CreateUserDto {
    @IsString()
    @IsNotEmpty()
    @IsIn(['individual', 'business'], {
      message: 'userType must be either individual or business',
    })
    userType: string;
  

    @ApiProperty({
      example: 'example@mail.com',
      description: 'This is the email addresss of the user.',
    })
    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
      example: '0727401058',
      description: 'This is the phone number of the user.',
    })
    phoneNumber?: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @ApiProperty({
      example: '@Password123',
      description: 'This is password of the user.',
    })
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

    @ValidateNested()
    @Type(() => AddressDetailsDto)
    @IsOptional()
    addressDetails?: AddressDetailsDto;
  }
  