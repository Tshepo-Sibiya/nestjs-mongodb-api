import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from 'mongoose';


@Schema({
    timestamps: true
})
export class User {

    @Prop({ required: true })
    firstname: string;


    @Prop({ required: false })
    lastname: string;

    @Prop({ unique: [true, 'Email already exists'], required: true })
    email: string;

    @Prop({ unique: true, required: true })
    password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);