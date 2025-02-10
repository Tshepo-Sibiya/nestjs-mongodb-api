import { IsBoolean, isBoolean, isEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserSettingsDto {

    @IsBoolean()
    biometricsOn?: boolean;


}