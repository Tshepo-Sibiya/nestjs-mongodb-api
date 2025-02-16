import { IsEmail, isEmail, IsEmpty, IsNotEmpty, IsNotIn, IsOptional, IsString, Matches, MaxLength, MinLength, ValidateNested } from "class-validator";



export class SignUpDto {


    @IsString()
    @IsNotEmpty()
    firstname: string;

    @IsString()
    lastname?: string;

    @IsString()
    phonenumber?: string;

    @IsString()
    title: string;

    @IsString()
    initials: string;

    @IsNotEmpty()
    @IsEmail({}, { message: 'Invalid email' })
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
        message: 'Password must contain at least one uppercase letter, one number, and one special character.',
    })
    @MaxLength(20, { message: 'Password cannot be longer than 20 characters.' })
    @IsNotIn(['password', '123456', 'qwerty'], {
        message: 'Password is too common.',
    })
    readonly password: string;

}