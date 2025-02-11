import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type InvoiceDocument = Invoice & Document;

@Schema({
    timestamps: true
})
export class Invoice {
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

    @Prop()
    notes: string;
}

export const InvoiceSchema = SchemaFactory.createForClass(Invoice);