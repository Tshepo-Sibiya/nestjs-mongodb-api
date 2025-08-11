import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from 'src/user/services/settings/settings.service';


import { AuthGuard } from '@nestjs/passport';
import { CreateSettingsDto } from 'src/user/dto/create-settings.dto';
import { Settings } from 'src/user/schemas/settings.schema';

@Controller('settings')
export class SettingsController {
  constructor(private settingsService: SettingsService) {

  }

  @Get('/getSettings')
  @UseGuards(AuthGuard())
  async getUserSettings(@Req() req) {
    return this.settingsService.GetSettingsById(req.user._id);
  }


  @Post('/createOrUpdateSettings')
  @UseGuards(AuthGuard())
  async createOrUpdateSettings(
    @Body()
    settings: CreateSettingsDto,
    @Req() req,
  ): Promise<Settings> {
    return this.settingsService.createOrUpdateSettings(req.user, settings);
  }

}
