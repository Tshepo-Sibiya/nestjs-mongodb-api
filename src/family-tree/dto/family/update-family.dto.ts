import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean, isNumber } from 'class-validator';

import { Optional } from '@nestjs/common';

export class UpdateFamilyDetailsDto {

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