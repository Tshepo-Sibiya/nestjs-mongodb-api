import { IsBoolean, isBoolean, isEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { isArrayBuffer } from "util/types";

export class UpdateSettingsDto {

    @IsOptional()
    @IsBoolean()
    biometricsOn: boolean;

    @IsOptional()
    companyLogo: Buffer;

}