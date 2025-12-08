import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { InvoiceStatus } from 'src/invoicing/enums/invoice-status.enum';

export class InvoiceDto {

  @IsString()
  invoiceNumber: string;

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

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  invoiceDate: Date;

  @IsNotEmpty()
  @IsString()
  status: InvoiceStatus;

  @IsOptional()
  @IsString()
  notes?: string;

}
