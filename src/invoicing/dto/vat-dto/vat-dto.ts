import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsArray, IsDate, IsOptional } from "class-validator";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";

export class VatDto {


    @IsNotEmpty()
    @IsNumber()
    rate: number;
  
    @Type(() => Date)
    @IsDate()
    startDate: Date;
  
    @Type(() => Date)
    @IsDate()
    endDate: Date;
  
  
  }
  