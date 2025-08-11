import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsOptional, isString, isNumber } from "class-validator";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";

export class BankAccountDetailsDto {


    @IsNotEmpty()
    @IsString()
    bankName: string;
  
    @IsNotEmpty()
    @IsString()
    branch: string;

    @IsNotEmpty()
    @IsString()
    branchCode: string;

    @IsNotEmpty()
    @IsNumber()
    accountNumber: number;


  
  }
  