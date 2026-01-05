import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Schema({ timestamps: true })
export class GymSession extends Document {
  
    @Prop({ required: true })
    date: Date;

    @Prop({ required: true })
    duration: number; // in minutes

    @Prop()
    notes?: string;

    @Prop({ default: 'completed' })
    status: 'completed' | 'scheduled' | 'cancelled';

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
    user: User;
}

export const GymSessionSchema = SchemaFactory.createForClass(GymSession);