import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { InvoiceItemDto } from 'src/invoicing/dto/invoice-item-dto/invoice-item.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { InvoiceItemService } from 'src/invoicing/services/invoice-item/invoice-item.service';

@Controller('invoice-item')
export class InvoiceItemController {

    constructor(private invoiceItemService: InvoiceItemService) {

    }

    @Post('/createInvoiceItem')
    @UseGuards(AuthGuard())
    async create(
        @Body() createInvoiceItemDto: InvoiceItemDto,
        @Req() req,
    ): Promise<InvoiceItem> {

        return await this.invoiceItemService.createInvoiceItem(req.user, createInvoiceItemDto);

    }

    @Patch('/updateInvoiceItem/:id')
    @UseGuards(AuthGuard())
    async updateInvoiceItem(
        @Body() updateInvoiceItemDto: InvoiceItemDto,
        @Param('id') id: string,
        @Req() req,
    ) {
        try {
            return await this.invoiceItemService.updateInvoiceItem(req.user, id, updateInvoiceItemDto);
        } catch (error) {
            // Handle error appropriately
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/getInvoiceItems')
    @UseGuards(AuthGuard())
    async getInvoiceItems(@Req() req,) {
        try {
            return await this.invoiceItemService.getInvoiceItems(req.user._id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/deleteInvoiceItem/:id')
    @UseGuards(AuthGuard())
    async deleteInvoiceItem(@Param('id') id: string,) {
        try {
            return await this.invoiceItemService.deleteInvoiceItem(id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
