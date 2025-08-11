import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({
    timestamps: true
})
export class Settings extends Document {

    @Prop({ required: false, default: false })
    biometricsOn: boolean;

    @Prop({ type: Buffer, required: false })
    companyLogo: Buffer;


    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    user: Types.ObjectId;
}

export const SettingsSchema = SchemaFactory.createForClass(Settings);
