import { isEmail, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserSettings } from "src/schemas/user-settings.schema";
import { CreateUserSettingsDto } from "./create-user-settings.dto";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsString()
    firstname: string;

    @IsString()
    lastname?: string;

    @IsNotEmpty()
    email: string;

    @IsOptional()
    @ValidateNested()
    settings: CreateUserSettingsDto
}