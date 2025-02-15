import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/schemas/user.schema';

@Schema({
    timestamps: true
})
export class VatRate extends Document {
    @Prop({ required: true })
    rate: number;

    @Prop({ required: true })
    startDate: Date;

    @Prop({ required: true })
    endDate: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;
}

export const VatRateSchema = SchemaFactory.createForClass(VatRate);