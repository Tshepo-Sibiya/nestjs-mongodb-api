import { Body, Controller, Delete, Get, HttpException, Param, Patch, Post, UsePipes, ValidationPipe } from "@nestjs/common";


import mongoose from "mongoose";

import { UserSettingsService } from "../UserSettingsService/userSettings.service";
import { CreateUserSettingsDto } from "../dto/CreateUserSettings.dto";
import { UpdateUserSettingsDto } from "../dto/UpdateUserSettings.dto";


@Controller('usersSettings')
export class UsersSettingsController {
    constructor(private usersSettingsService: UserSettingsService) { }

    @Post(':id')
    @UsePipes(new ValidationPipe())
    CreateUser(@Param('id') id: string, @Body() createUserSettingsDto: CreateUserSettingsDto) {
        console.log(createUserSettingsDto);
        return this.usersSettingsService.createUserSettings(id, createUserSettingsDto);
    }

    @Get(':id')
    async GetUserSettingsById(@Param('id') id: string) {
        const isValid = mongoose.Types.ObjectId.isValid(id);
        if (!isValid) throw new HttpException('User not found', 404);
        const user = await this.usersSettingsService.GetUserSettingsById(id);
        if (!user) throw new HttpException('User settings not found', 404);
        return user;
    }

    @Get()
    GetUserSettings() {
        return this.usersSettingsService.GetUserSettings();
    }

    @Patch(':id')
    async updateUserSettingsByUserId(
        @Param('id') userId: string,
        @Body() updateUserSettingsDto: UpdateUserSettingsDto,
    ) {
        return this.usersSettingsService.UpdateUserSettings(userId, updateUserSettingsDto);
    }


}