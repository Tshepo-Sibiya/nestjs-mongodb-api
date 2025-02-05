import { isEmail, IsNotEmpty, IsString } from "class-validator";

export class UpdateUserDto {

    @IsString()
    firstname: string;

    @IsString()
    lastname?: string;

}