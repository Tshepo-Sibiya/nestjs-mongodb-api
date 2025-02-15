import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from 'src/settings/services/settings/settings.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Settings } from 'src/settings/schemas/settings.schema';
import { CreateSettingsDto } from 'src/settings/dto/create-settings.dto';
import { AuthGuard } from '@nestjs/passport';
import { VatRateService } from 'src/invoicing/services/vat/vat-rate.service';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';

@Controller('vat-rate')
export class VatRateController {
  constructor(private vatRateService: VatRateService) {

  }

  @Get('/getUserVatRate')
  @UseGuards(AuthGuard())
  async getUserSettings(@Req() req) {
    return this.vatRateService.GetUserVatRateById(req.user._id);
  }


  @Post('/createOrUpdateUserVatRate')
  @UseGuards(AuthGuard())
  async createOrUpdateUserVatRate(
    @Body()
    vatRate: VatDto,
    @Req() req,
  ) {
    return this.vatRateService.createOrUpdateQuote(req.user, vatRate);
  }

}
