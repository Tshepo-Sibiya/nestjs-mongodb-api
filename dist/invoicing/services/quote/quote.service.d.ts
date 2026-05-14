import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Model } from 'mongoose';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { CreateQuoteDto } from 'src/invoicing/dto/quote-dto/create-quote.dto';
import { Quote } from 'src/invoicing/schemas/quote.schema';
import { UpdateQuoteDto } from 'src/invoicing/dto/quote-dto/update-quote.dto';
export declare class QuoteService {
    private quoteModel;
    private invoiceItemModel;
    private customerModel;
    constructor(quoteModel: Model<Quote>, invoiceItemModel: Model<InvoiceItem>, customerModel: Model<Customer>);
    createQuote(user: User, createQuoteDto: CreateQuoteDto): Promise<Quote>;
    getQuotesByUserId(userId: string): Promise<(import("mongoose").Document<unknown, {}, Quote> & Quote & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    })[]>;
    deleteQuote(id: string, userId: string): Promise<{
        Message: string;
    }>;
    updateQuote(user: User, id: string, updateQuoteDto: UpdateQuoteDto): Promise<{
        Message: string;
    }>;
    generateQuoteNumber(userId: any): Promise<string>;
}
