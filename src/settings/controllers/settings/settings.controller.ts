import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from 'src/settings/services/settings/settings.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Settings } from 'src/settings/schemas/settings.schema';
import { CreateSettingsDto } from 'src/settings/dto/create-settings.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('userSettings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {

    }

    @Get('/getAllUsersSettings')
    @UseGuards(AuthGuard())
    async getAllSettings(@Query() query: ExpressQuery): Promise<Settings[]> {
      return this.settingsService.findAll(query);
    }


    @Post('/createUserSettings')
    @UseGuards(AuthGuard())
    async getAllUsersSettings(
      @Body()
      settings: CreateSettingsDto,
      @Req() req,
    ): Promise<Settings> {
      return this.settingsService.createOrUpdateSettings(req.user, settings);
    }

}
