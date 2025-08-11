import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AddressDetailsDocument = AddressDetails & Document;

@Schema({ timestamps: true })
export class AddressDetails extends Document {

    @Prop({ required: true })
    lineOne: string;
  
    @Prop({ required: false })
    lineTwo: string;

    @Prop({ required: false })
    suburb: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    province: string;

    @Prop({ required: true })
    country: string;

    @Prop({ required: true })
    postalCode: number;

    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const AddressDetailsSchema = SchemaFactory.createForClass(AddressDetails);
