import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { Invoice } from './invoice.schema';

@Schema({
    timestamps: true
})
export class InvoiceItem extends Document {
    @Prop({ required: true })
    additionalDetails: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    itemId: number;

    @Prop({ required: true })
    rate: number;

    @Prop({ required: true })
    status: string;

    @Prop({ required: true })
    taxable: boolean;

    @Prop({ type: mongoose.Types.ObjectId, ref: 'Invoice', required: true })
    invoice: Invoice;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
