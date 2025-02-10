import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/schemas/user.schema";
import { UserSettings, UserSettingsSchema } from "src/schemas/userSettings.schema";
import { UsersSettingsController } from "./controllers/userSettings.controller";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { UserSettingsService } from "./UserSettingsService/userSettings.service";



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