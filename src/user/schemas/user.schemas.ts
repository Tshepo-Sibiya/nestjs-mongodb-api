import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";
import { Invoice } from "src/invoicing/schemas/invoice.schema";



@Schema({
    timestamps: true
})
export class User extends Document {

    @Prop({ required: true })
    firstname: string;

    @Prop({ required: false })
    lastname: string;

    @Prop({ required: false })
    title: string;

    @Prop({ required: false })
    initials: string;

    @Prop({ required: false })
    phonenumber: string;

    @Prop({ unique: [true, 'Email already exists'], required: true })
    email: string;

    @Prop({ unique: true, required: true })
    password: string;


}

export const UserSchema = SchemaFactory.createForClass(User);