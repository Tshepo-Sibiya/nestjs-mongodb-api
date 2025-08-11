import { Body, Controller, Get, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/services/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('user')
export class UserController {
    constructor(private authService: UserService) {

    }


    @Post('/signup')
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User successfully created.' })
    @ApiResponse({ status: 400, description: 'Invalid input.' })
    signUp(@Body() signUpDto: CreateUserDto): Promise<{ token: string }> {
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
    async updateUserDetails(@Req() req,@Body() updateUser: UpdateUserDto): Promise<User> {
        return await this.authService.updateUserdetails(req.user._id,updateUser);
    }

}
