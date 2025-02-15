import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsOptional } from "class-validator";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";

export class UpdateQuoteDto {
  
    @IsNotEmpty()
    @IsString()
    customerId: string;
  
    @IsNotEmpty()
    @IsNumber()
    totalAmount: number;
  
    @IsNotEmpty()
    @IsArray()
    invoiceItems: InvoiceItem[];
  
    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    issueDate: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    dueDate: Date;

    @IsNotEmpty()
    @Type(() => Date)
    @IsDate()
    expiryDate: Date;
  
    @IsOptional()
    @IsString()
    notes?: string;
  
  }
  