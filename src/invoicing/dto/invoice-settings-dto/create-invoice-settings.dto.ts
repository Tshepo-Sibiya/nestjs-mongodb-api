import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean, isNumber, IsNumberString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateInvoiceSettingDto {


  @IsNotEmpty()
  @IsString()
  companyName: string;

  @IsNotEmpty()
  @IsString()
  registrationNumber: string;

  @IsNotEmpty()
  @IsString()
  vatNumber: string;

  @IsNotEmpty()
  @IsNumberString()
  vatRate: string;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailAddress: string;

  @IsString()
  telephone: string;

  @IsString()
  invoiceNotes: string;

  //Bank details
  @IsNumberString()
  accountNumber: string;

  @IsString()
  bankName: string;

  @IsString()
  branchName: string;

  @IsString()
  branchCode: string;

  //Address details
  @IsString()
  addressLineOne: string;

  @IsString()
  addressLineTwo: string;

  @IsString()
  suburb: string;

  @IsString()
  city: string;

  @IsString()
  province: string;

  @IsString()
  country: string;

  @IsNumberString()
  postalCode: string;



}