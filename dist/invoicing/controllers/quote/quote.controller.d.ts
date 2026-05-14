import { CreateQuoteDto } from 'src/invoicing/dto/quote-dto/create-quote.dto';
import { UpdateQuoteDto } from 'src/invoicing/dto/quote-dto/update-quote.dto';
import { Quote } from 'src/invoicing/schemas/quote.schema';
import { QuoteService } from 'src/invoicing/services/quote/quote.service';
export declare class QuoteController {
    private quoteService;
    constructor(quoteService: QuoteService);
    create(createQuoteDto: CreateQuoteDto, req: any): Promise<Quote>;
    updateQuote(updateQuoteDto: UpdateQuoteDto, id: string, req: any): Promise<{
        Message: string;
    }>;
    getQuotes(req: any): Promise<(import("mongoose").Document<unknown, {}, Quote> & Quote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteQuote(id: string, req: any): Promise<{
        Message: string;
    }>;
}
