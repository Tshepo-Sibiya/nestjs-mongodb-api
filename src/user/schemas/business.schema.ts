import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type BusinessDocument = Business & Document;

@Schema({ timestamps: true })
export class Business {
  @Prop({ required: true })
  businessName: string;

  @Prop({ required: true })
  registrationNumber: string;

  @Prop({ required: true })
  vatNumber: string;

  @Prop()
  contactPerson: string;

  @Prop()
  phoneNumber: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  user: Types.ObjectId;
}

export const BusinessSchema = SchemaFactory.createForClass(Business);
