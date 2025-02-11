import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { InvoiceSettingsService } from 'src/invoicing/services/invoice-settings/invoice-settings.service';
import { InvoiceService } from 'src/invoicing/services/invoice/invoice.service';

@Controller('invoice-settings')
export class InvoiceSettingsController {

    constructor(private invoiceSettingsService: InvoiceSettingsService) {

    }

    @Post('/createInvoiceSettings')
    createInvoiceSettings() {

    }

    @Patch('/updateInvoiceSettings')
    updateInvoiceSettings() {

    }

    @Get('/getInvoiceSettings')
    getInvoiceItems() {

    }

    @Delete('/deleteInvoiceSettings')
    deleteInvoiceItem() {

    }
}
