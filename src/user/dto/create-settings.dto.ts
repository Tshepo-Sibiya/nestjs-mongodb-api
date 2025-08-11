
import { isEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSettingsDto {

    @IsOptional()
    biometricsOn: boolean;

    @IsOptional()
    companyLogo: Buffer;



}