import { Body, Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { CreateInvoiceDto } from 'src/invoicing/dto/invoice-dto/create-invoice.dto';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { InvoiceService } from 'src/invoicing/services/invoice/invoice.service';

@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) {

    }
    @Post('/createInvoice')
    async create(
        @Body() createInvoiceDto: CreateInvoiceDto,
        @Req() req,
    ): Promise<Invoice> {
        return this.invoiceService.createInvoice(createInvoiceDto);
    }

    @Patch('/updateInvoice')
    updateInvoice() {

    }

    @Get('/getInvoices')
    getInvoices() {

    }

    @Delete('/deleteInvoice')
    deleteInvoice() {

    }
}
