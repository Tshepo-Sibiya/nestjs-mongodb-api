import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SignUpDto } from 'src/user/dto/create-user.dto';
import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/services/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/schemas/user.schemas';

@Controller('user')
export class UserController {
    constructor(private authService: UserService) {

    }


    @Post('/signup')
    signUp(@Body() signUpDto: SignUpDto): Promise<{ token: string }> {
        return this.authService.signUp(signUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
        return this.authService.login(loginDto);
    }

    @Get('/getProfileDetails')
    @UseGuards(AuthGuard())
    getProfileDetails(@Req() req,) {
        return this.authService.getProfileDetails(req.user._id);
    }

    @Patch('/updateUserDetails')
    @UseGuards(AuthGuard())
    updateUserDetails(@Req() req,@Body() updateUser: UpdateUserDto): Promise<User> {
        return this.authService.updateUserdetails(req.user._id,updateUser);
    }

}
