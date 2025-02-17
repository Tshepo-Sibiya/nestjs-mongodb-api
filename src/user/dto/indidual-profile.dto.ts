import { IsString, IsNotEmpty, IsOptional } from "class-validator";

export class IndividualProfileDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;
  
    @IsString()
    @IsNotEmpty()
    lastName: string;
  
    @IsString()
    @IsOptional()
    title?: string;
  
    @IsString()
    @IsOptional()
    initials?: string;
  
    @IsOptional()
    dateOfBirth?: Date;
  
    @IsString()
    @IsOptional()
    phoneNumber?: string;
  }