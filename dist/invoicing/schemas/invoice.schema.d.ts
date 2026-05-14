import mongoose, { Document, Types } from 'mongoose';
import { InvoiceItem } from './invoice-item.schema';
import { Customer } from './customer.schema';
import { InvoiceStatus } from '../enums/invoice-status.enum';
export type InvoiceDocument = Invoice & Document;
export declare class Invoice {
    invoiceNumber: string;
    totalAmount: number;
    dueDate: Date;
    invoiceDate: Date;
    status: InvoiceStatus;
    notes: string;
    invoiceItems: InvoiceItem[];
    customer: Customer;
    user: Types.ObjectId;
}
export declare const InvoiceSchema: mongoose.Schema<Invoice, mongoose.Model<Invoice, any, any, any, mongoose.Document<unknown, any, Invoice> & Invoice & {
    _id: Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Invoice, mongoose.Document<unknown, {}, mongoose.FlatRecord<Invoice>> & mongoose.FlatRecord<Invoice> & {
    _id: Types.ObjectId;
} & {
    __v: number;
}>;
