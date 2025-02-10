
import { isEmail, IsEmpty, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { User } from "src/auth/schemas/auth.schemas";

export class CreateSettingsDto {

    @IsOptional()
    biometricsOn: boolean;


    @IsNotEmpty()
    @IsString()
    lastupdated: string;

    @IsEmpty({ message: 'Empty ID'})
    readonly user: User;    
}