import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Types } from 'mongoose';
import { InvoiceItem } from './invoice-item.schema';
import { Customer } from './customer.schema';

export type InvoiceDocument = Invoice & Document;

@Schema({
    timestamps: true
})
export class Invoice {
    @Prop({ required: true })
    invoiceNumber: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    dueDate: Date;

    @Prop()
    notes: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'InvoiceItems' }] }) 
    invoiceItems: InvoiceItem[];

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Customer', required: true })
    customer: Customer;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);