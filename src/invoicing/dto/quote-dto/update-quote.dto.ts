import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsOptional } from "class-validator";
import { InvoiceStatus } from "src/invoicing/enums/invoice-status.enum";
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

  @IsNotEmpty()
  @IsString()
  status: InvoiceStatus;

  @IsOptional()
  @IsString()
  notes?: string;

}
