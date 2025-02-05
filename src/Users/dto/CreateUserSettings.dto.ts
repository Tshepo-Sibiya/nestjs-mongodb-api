
import { isEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateUserSettingsDto {

    @IsOptional()
    biometricsOn: boolean;


    @IsNotEmpty()
    @IsString()
    lastupdated: string;
}