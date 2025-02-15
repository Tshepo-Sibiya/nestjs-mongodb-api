import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsArray, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';

export class CreateInvoiceItemDto {
  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsBoolean()
  archived: boolean;

}
