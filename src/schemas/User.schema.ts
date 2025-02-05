import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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

}

export const UserSchema = SchemaFactory.createForClass(User);