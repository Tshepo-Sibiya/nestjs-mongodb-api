import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class UserSettings {


    @Prop({ required: false })
    biometricsOn: boolean;


}
export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);