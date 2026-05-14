import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';
import { InvoiceItem } from './invoice-item.schema';
import { Customer } from './customer.schema';
import { InvoiceStatus } from '../enums/invoice-status.enum';
export type QuoteDocument = Quote & Document;
export declare class Quote {
    quoteNumber: string;
    totalAmount: number;
    dueDate: Date;
    issueDate: Date;
    expiryDate: Date;
    status: InvoiceStatus;
    notes: string;
    invoiceItems: InvoiceItem[];
    customer: Customer;
    user: Types.ObjectId;
}
export declare const QuoteSchema: mongoose.Schema<Quote, mongoose.Model<Quote, any, any, any, mongoose.Document<unknown, any, Quote> & Quote & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Quote, mongoose.Document<unknown, {}, mongoose.FlatRecord<Quote>> & mongoose.FlatRecord<Quote> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
