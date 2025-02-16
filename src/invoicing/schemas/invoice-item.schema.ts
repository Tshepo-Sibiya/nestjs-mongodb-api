import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/user/schemas/user.schemas';

export type InvoiceItemDocument = InvoiceItem & Document;

@Schema({
    timestamps: true
})
export class InvoiceItem extends Document {

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ default: false })
    archived: boolean;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const InvoiceItemSchema = SchemaFactory.createForClass(InvoiceItem);
