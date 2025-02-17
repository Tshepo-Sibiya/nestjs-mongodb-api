import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type IndividualDocument = Individual & Document;

@Schema({ timestamps: true })
export class Individual {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ required: false })
    title: string;

    @Prop({ required: false })
    initials: string;

    @Prop()
    dateOfBirth: Date;
    
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const IndividualSchema = SchemaFactory.createForClass(Individual);
