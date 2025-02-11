import { IsEmail, isEmail, IsNotEmpty, IsOptional, IsString, MinLength, ValidateNested } from "class-validator";



export class SignUpDto {


    @IsString()
    firstname: string;

    @IsString()
    lastname?: string;

    @IsString()
    phonenumber?: string;

    @IsNotEmpty()
    @IsEmail({}, {message: 'Invalid email'})
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    readonly password: string;

}