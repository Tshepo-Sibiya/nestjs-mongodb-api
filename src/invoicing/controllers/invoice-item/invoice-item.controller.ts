import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { InvoiceItemService } from 'src/invoicing/services/invoice-item/invoice-item.service';

@Controller('invoice-item')
export class InvoiceItemController {

    constructor(private invoiceItemService: InvoiceItemService) {

    }

    @Post('/createInvoiceItem')
    createInvoiceItem(@Req() req,) {

    }

    @Patch('/updateInvoiceItem')
    updateInvoiceItem() {

    }

    @Get('/getInvoiceItems')
    getInvoiceItems() {

    }

    @Delete('/deleteInvoiceItem')
    deleteInvoiceItem() {

    }
}
