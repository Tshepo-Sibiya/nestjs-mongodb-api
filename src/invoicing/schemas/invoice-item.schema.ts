import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

export type InvoiceItemDocument = InvoiceItem & Document;

@Schema({
    timestamps: true
})
export class InvoiceItem extends Document {

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    price: number;

    @Prop({ required: true })
    quantity: number;

    @Prop({ required: true })
    discount: number;

    @Prop({ default: false })
    totalLineCost: number;

    @Prop({ default: false })
    vat: number;

    @Prop({ default: false })
    vatLineAmount: number;

    @Prop({ default: false })
    archived: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
