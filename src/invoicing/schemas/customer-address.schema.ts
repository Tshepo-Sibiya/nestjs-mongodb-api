import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Address extends Document {
    @Prop({ required: true })
    addressLineOne: string;

    @Prop()
    addressLineTwo: string;

    @Prop({ required: true })
    province: string;

    @Prop({ required: true })
    city: string;

    @Prop({ required: true })
    postalCode: string;
}

export const AddressSchema = SchemaFactory.createForClass(Address);