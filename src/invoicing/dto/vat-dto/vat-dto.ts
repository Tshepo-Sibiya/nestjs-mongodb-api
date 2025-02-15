import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsOptional } from "class-validator";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";

export class VatDto {

    @IsString()
    rate: number;
  
    @IsNotEmpty()
    @IsString()
    startDate: Date;
  
    @IsNotEmpty()
    @IsNumber()
    endDate: Date;
  
  
  }
  