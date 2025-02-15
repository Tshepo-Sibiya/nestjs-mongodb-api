import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { InvoiceService } from 'src/invoicing/services/invoice/invoice.service';

import { Response } from 'express';
import * as fs from 'fs';

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
        @Body() updateInvoiceDto: UpdateInvoiceDto,
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
    async deleteInvoice(@Param('id') id: string,@Req() req,) {
        try {
            return await this.invoiceService.deleteInvoice(id, req.user._id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/downloadInvoicePdf')
    generatePDF(@Res() res: Response) {
        const filePath = this.invoiceService.generatePDF();
        
        // Wait for the file to be written before sending the response
        setTimeout(() => {
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename=output.pdf');
          const fileStream = fs.createReadStream(filePath);
          fileStream.pipe(res);
        }, 1000);
      }
}
