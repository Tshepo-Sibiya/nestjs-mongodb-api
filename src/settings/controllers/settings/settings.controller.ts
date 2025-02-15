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

  @Get('/getUserSettings')
  @UseGuards(AuthGuard())
  async getUserSettings(@Req() req) {
    return this.settingsService.GetUserSettingsById(req.user._id);
  }


  @Post('/createOrUpdateUserSettings')
  @UseGuards(AuthGuard())
  async createOrUpdateUserSettings(
    @Body()
    settings: CreateSettingsDto,
    @Req() req,
  ): Promise<Settings> {
    return this.settingsService.createOrUpdateSettings(req.user, settings);
  }

}
