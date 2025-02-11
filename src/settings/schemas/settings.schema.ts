import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { User } from "src/auth/schemas/auth.schemas";
import mongoose from 'mongoose';


@Schema({
    timestamps: true
})
export class Settings {

    @Prop({ required: false })
    biometricsOn: boolean;

    @Prop({ required: false })
    logoPicture?: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User;

}
export const SettingsSchema = SchemaFactory.createForClass(Settings);