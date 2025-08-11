import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateQuoteDto } from 'src/invoicing/dto/quote-dto/create-quote.dto';
import { UpdateQuoteDto } from 'src/invoicing/dto/quote-dto/update-quote.dto';


import { Quote } from 'src/invoicing/schemas/quote.schema';
import { QuoteService } from 'src/invoicing/services/quote/quote.service';


@Controller('quote')
export class QuoteController {
    constructor(private quoteService: QuoteService) {

    }
    @Post('/createQuote')
    @UseGuards(AuthGuard())
    async create(
        @Body() createQuoteDto: CreateQuoteDto,
        @Req() req,
    ): Promise<Quote> {

        return await this.quoteService.createQuote(req.user, createQuoteDto);

    }

    @Patch('/updateQuote/:id')
    @UseGuards(AuthGuard())
    async updateQuote(
        @Body() updateQuoteDto: UpdateQuoteDto,
        @Param('id') id: string,
        @Req() req,
    ) {
        try {
            return await this.quoteService.updateQuote(req.user, id, updateQuoteDto);
        } catch (error) {
            // Handle error appropriately
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Get('/getQuotes')
    @UseGuards(AuthGuard())
    async getQuotes(@Req() req,) {
        try {
            return await this.quoteService.getQuotesByUserId(req.user._id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Delete('/deleteQuote/:id')
    @UseGuards(AuthGuard())
    async deleteQuote(@Param('id') id: string,@Req() req,) {
        try {
            return await this.quoteService.deleteQuote(id, req.user._id);
        } catch (error) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
