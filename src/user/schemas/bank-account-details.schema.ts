import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})
export class BankAccountDetails extends Document {

    @Prop({ required: true })
    bankName: string;
  
    @Prop({ required: true })
    branch: string;

    @Prop({ required: true })
    branchCode: string;

    @Prop({ required: true })
    accountNumber: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const BankAccountDetailsSchema = SchemaFactory.createForClass(BankAccountDetails);
