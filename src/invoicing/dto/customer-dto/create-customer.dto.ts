import { IsNotEmpty, IsString, IsOptional, ValidateNested, IsEmail, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';

export class InvoiceCustomerAddressDto {
  @IsOptional()
  @IsString()
  addressLineOne?: string;

  @IsOptional()
  @IsString()
  addressLineTwo?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  province?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  country?: string;
}

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  archived?: boolean;

  @IsOptional()
  @ValidateNested()
  @Type(() => InvoiceCustomerAddressDto)
  address?: InvoiceCustomerAddressDto;
}