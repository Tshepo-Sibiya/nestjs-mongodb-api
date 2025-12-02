import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateInvoiceSettingsDto {

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
  @IsNumber()
  vatRate: Number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  emailAddress: string;

  @IsString()
  telephone: string;

  @IsBoolean()
  invoiceNotes: boolean;

  //Bank details
  @IsNumber()
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

  @IsNumber()
  postalCode: string;

}