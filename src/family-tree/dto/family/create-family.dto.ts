import { Optional } from "@nestjs/common";
import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateFamilyDetailsDto {

    @IsString()
    @IsNotEmpty()
    familyName: string;

    @IsString()
    @Optional()
    familyClanName: string;

    @IsString()
    @Optional()
    language: string;


}