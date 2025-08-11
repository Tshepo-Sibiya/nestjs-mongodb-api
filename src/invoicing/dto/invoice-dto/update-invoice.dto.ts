import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';

export class UpdateInvoiceDto {

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
  dueDate: Date;

  @IsOptional()
  @IsString()
  notes?: string;

}
