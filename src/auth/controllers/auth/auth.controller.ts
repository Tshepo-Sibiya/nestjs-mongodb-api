import { Body, Controller, Get, Post } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { LoginDto } from 'src/auth/dto/login.dto';
import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {

    }


    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Get('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

}
