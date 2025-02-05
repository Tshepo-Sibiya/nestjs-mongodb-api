import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";


@Schema()
export class UserSettings {


    @Prop({ required: false })
    biometricsOn: boolean;

    @Prop({ required: true })
    lastupdated: string

}
export const UserSettingsSchema = SchemaFactory.createForClass(UserSettings);