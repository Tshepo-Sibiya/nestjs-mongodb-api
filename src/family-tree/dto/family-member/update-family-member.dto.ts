import { IsNotEmpty, IsString, IsNumber, IsOptional, IsDate, ValidateNested, IsEmail, isString, IsBoolean } from 'class-validator';
import { Type } from 'class-transformer';
import { Gender } from 'src/common/enums/gender.enum';

export class UpdateFamilyMemberDto {

    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    gender: Gender;

    @IsString()
    @IsNotEmpty()
    birthDate: Date;

    @IsString()
    deathDate: Date;

    @IsNumber()
    @IsNotEmpty()
    generation: number;


}