


import { Body, Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { SettingsService } from 'src/settings/services/settings/settings.service';
import { Query as ExpressQuery } from 'express-serve-static-core';
import { Settings } from 'src/settings/schemas/settings.schema';
import { CreateSettingsDto } from 'src/settings/dto/create-settings.dto';
import { AuthGuard } from '@nestjs/passport';
import { VatRateService } from 'src/invoicing/services/vat/vat-rate.service';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';
import { InvoiceAcccountDetailsService } from 'src/invoicing/services/invoice-account-details/invoice-account-details.service';
import { InvoiceAccountDetailsDto } from 'src/invoicing/dto/invoice-account-details-dto/invoice-account-details';

@Controller('invoice-account-details')
export class InvoiceAccountDetailsController{
  constructor(private invoiceAcccountDetailsService: InvoiceAcccountDetailsService) {

  }

  @Get('/getInvoiceAccountDetails')
  @UseGuards(AuthGuard())
  async getInvoiceAccountDetails(@Req() req) {
    return this.invoiceAcccountDetailsService.GetUserInvoiceAcccountDetailsById(req.user._id);
  }


  @Post('/createOrUpdateInvoiceAccountDetails')
  @UseGuards(AuthGuard())
  async createOrUpdateInvoiceAccountDetails(
    @Body()
    accountDetails: InvoiceAccountDetailsDto,
    @Req() req,
  ) {
    return this.invoiceAcccountDetailsService.createOrUpdateInvoiceAccountDetails(req.user, accountDetails);
  }

}
