import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';
import { InvoiceItem } from './invoice-item.schema';
import { Customer } from './customer.schema';

export type QuoteDocument = Quote & Document;

@Schema({
    timestamps: true
})
export class Quote {
    @Prop({ required: true })
    invoiceNumber: string;

    @Prop({ required: true })
    customerName: string;

    @Prop({ required: true })
    customerEmail: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    dueDate: Date;

    @Prop({ required: true })
    issueDate: Date;

    @Prop({ required: true })
    expiryDate: Date;

    @Prop()
    notes: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'InvoiceItem' }] }) 
    invoiceItems: InvoiceItem[];

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Customer', required: true })
    customer: Customer;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const QuoteSchema = SchemaFactory.createForClass(Quote);