import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateInvoiceSettingDto } from 'src/invoicing/dto/invoice-settings-dto/create-invoice-settings.dto';
import { InvoiceSettings } from 'src/invoicing/schemas/invoice-settings.schema';
import { InvoiceSettingsService } from 'src/invoicing/services/invoice-settings/invoice-settings.service';

@Controller('invoice-settings')
export class InvoiceSettingsController {


    constructor(private invoiceSettingsService: InvoiceSettingsService) {

    }

    @Get('/getInvoiceSettingsByUserId')
    @UseGuards(AuthGuard())
    getInvoiceSettingsByUserId(@Req() req) {
        return this.invoiceSettingsService.getInvoiceSettingsByUserId(req.user._id);
    }


    @Post('/createOrUpdateInvoiceSettings')
    @UseGuards(AuthGuard())
    async create(
        @Body() newInvoiceData: CreateInvoiceSettingDto,
        @Req() req
    ): Promise<InvoiceSettings> {
        return this.invoiceSettingsService.createOrUpdateInvoiceSettings(req.user, newInvoiceData);
    }




}
