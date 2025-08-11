import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCustomerDto {

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  phone: string;


  @IsBoolean()
  archived: boolean;

}