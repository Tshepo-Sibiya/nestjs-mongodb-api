import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/user-settings.schema";
import { UsersSettingsController } from "./controllers/user-settings.controller";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSettingsService } from "./user-settings-service/user-settings.service";



@Module({
    imports: [
        // MongooseModule.forFeature([
        //     {
        //         name: User.name,
        //         schema: UserSchema,
        //     },
        //     {
        //         name: UserSettings.name,
        //         schema: UserSettingsSchema,
        //     },
        
        // ])
    ],
    providers: [
        // UsersService,
        // UserSettingsService
    ],
    controllers: [
        // UsersController,
        // UsersSettingsController

    ]
})

export class UsersModule { }