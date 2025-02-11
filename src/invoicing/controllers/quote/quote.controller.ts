import { Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { QuoteService } from 'src/invoicing/services/quote/quote.service';

@Controller('quote')
export class QuoteController {

    constructor(private quoteService: QuoteService) {

    }
    
    @Post('/createQuote')
    createQuote() {

    }

    @Patch('/updateQuote')
    updateQuote() {

    }

    @Get('/getQuotes')
    getQuotes() {

    }

    @Delete('/deleteQuote')
    deleteQuote() {

    }
}
