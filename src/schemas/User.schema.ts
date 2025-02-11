import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';
import { UserSettings } from "./user-settings.schema";

@Schema()
export class User {

    @Prop({ unique: true, required: true })
    username: string;

    @Prop({ required: true })
    firstname: string;

    @Prop({ required: false })
    lastname: string;

    @Prop({ unique: true, required: true })
    email: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref:  'UserSettings'})
    settings?: UserSettings

}

export const UserSchema = SchemaFactory.createForClass(User);