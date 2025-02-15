import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { InvoiceService } from 'src/invoicing/services/invoice/invoice.service';

@Controller('invoice')
export class InvoiceController {
    constructor(private invoiceService: InvoiceService) {

    }
    @Post('/createInvoice')
    @UseGuards(AuthGuard())
    async create(
        @Body() createInvoiceDto: InvoiceDto,
        @Req() req,
    ): Promise<Invoice> {

        return await this.invoiceService.createInvoice(req.user, createInvoiceDto);

    }

    @Patch('/updateInvoice/:id')
    @UseGuards(AuthGuard())
    async updateInvoice(
        @Body() updateInvoiceDto: InvoiceDto,
        @Param('id') id: string,
        @Req() req,
    ) {
        try {
            return await this.invoiceService.updateInvoice(req.user, id, updateInvoiceDto);
        } catch (error) {
            // Handle error appropriately
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/getInvoices')
    @UseGuards(AuthGuard())
    async getInvoices(@Req() req,) {
        try {
            return await this.invoiceService.getInvoicesByUserId(req.user._id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/deleteInvoice/:id')
    @UseGuards(AuthGuard())
    async deleteInvoice(@Param('id') id: string,) {
        try {
            return await this.invoiceService.deleteInvoice(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
