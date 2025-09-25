import { IsString, IsNotEmpty, IsOptional } from "class-validator";
import { Gender } from "src/common/enums/gender.enum";

export class CreateFamilyMemberDetailsDto {

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

    @IsString()
    @IsNotEmpty()
    generation: number;


}