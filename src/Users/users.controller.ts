import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { UsersService } from "./users.service";
import { CreateUserDto } from "./dto/CreateUser.dto";
import mongoose from "mongoose";
import { UpdateUserDto } from "./dto/UpdateUser.dto";


@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) { }


    @Post()
    @UsePipes(new ValidationPipe())
    CreateUser(@Body() createUserDto: CreateUserDto) {
        console.log(createUserDto);
        return this.usersService.createUser(createUserDto);
    }

    @Get()
    GetUsers() {
        return this.usersService.getUsers();
    }

    @Get(':id')
    async GetUserById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('User not found', 404);
        const user = await this.usersService.getUserById(id);
        if (!user) throw new HttpException('User not found', 404);
        return user;
    }

    @Patch(':id')
    @UsePipes(new ValidationPipe())
    async UpdateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const user = await this.usersService.UpdateUser(id, updateUserDto);
        if (!user) throw new HttpException('User not found', 404);
    }

    @Delete(':id')
    async DeleteUser(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('Invalid ID', 400);
        const user = await this.usersService.deleteUser(id);
        if (!user) throw new HttpException('User not found', 404);
        console.log(user);
        return;
  
    }

}