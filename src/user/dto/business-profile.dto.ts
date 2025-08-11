import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class BusinessProfileDto {
    @IsString()
    @IsNotEmpty()
    businessName: string;
  
    @IsString()
    @IsNotEmpty()
    registrationNumber: string;
  
    @IsString()
    @IsOptional()
    vatNumber?: string;
  
    @IsString()
    @IsNotEmpty()
    contactPerson: string;
  

  }