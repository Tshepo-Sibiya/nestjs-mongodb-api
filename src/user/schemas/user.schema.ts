import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { InvoiceItem } from "src/invoicing/schemas/invoice-item.schema";
import { Invoice } from "src/invoicing/schemas/invoice.schema";
import { Business } from "./business.schema";
import { Individual } from "./individual.schema";



@Schema({
    timestamps: true
})
export class User extends Document {

    @Prop({ unique: [true, 'Email already exists'], required: true })
    email: string;

    @Prop({ unique: false, required: false })
    phoneNumber: string;

    @Prop({ unique: true, required: true })
    password: string;

    @Prop({ required: true, enum: ['individual', 'business'] })
    userType: string;

    @Prop({ type: Types.ObjectId, ref: Individual.name })
    individualProfile?: Types.ObjectId;
  
    @Prop({ type: Types.ObjectId, ref: Business.name })
    businessProfile?: Types.ObjectId;

}

export const UserSchema = SchemaFactory.createForClass(User);