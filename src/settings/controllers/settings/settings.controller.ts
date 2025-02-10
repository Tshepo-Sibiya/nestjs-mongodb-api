import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from 'src/settings/services/settings/settings.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Settings } from 'src/settings/schemas/settings.schemas';
import { CreateSettingsDto } from 'src/settings/dto/CreateSettings.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('settings')
export class SettingsController {
    constructor(private settingsService: SettingsService) {

    }

    @Get()
    async getAllBooks(@Query() query: ExpressQuery): Promise<Settings[]> {
      return this.settingsService.findAll(query);
    }


    @Post()
    @UseGuards(AuthGuard())
    async createBook(
      @Body()
      settings: CreateSettingsDto,
      @Req() req,
    ): Promise<Settings> {
      return this.settingsService.createSettings(req.user, settings);
    }

}
