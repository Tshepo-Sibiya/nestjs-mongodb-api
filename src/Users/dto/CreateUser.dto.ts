import { isEmail, IsNotEmpty, IsString } from "class-validator";

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
}