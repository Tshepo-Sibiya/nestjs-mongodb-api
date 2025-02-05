import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSettings } from "src/schemas/UserSettings.schema";
import { UpdateUserSettingsDto } from "../dto/UpdateUserSettings.dto";
import { CreateUserSettingsDto } from "../dto/CreateUserSettings.dto";
import { User } from "src/schemas/User.schema";


@Injectable()
export class UserSettingsService {
    constructor(@InjectModel(
        UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(User.name) private userModel: Model<User>) {

    }

    createUserSettings(createUserSettingsDto: CreateUserSettingsDto) {
        const newUserSettings = new this.userSettingsModel(createUserSettingsDto);
        return newUserSettings.save();
    }

    UpdateUserSettings(id: string, updateUserSettinsDto: UpdateUserSettingsDto) {
        return this.userSettingsModel.findByIdAndUpdate(id, updateUserSettinsDto, { new: true });
    }

    async GetUserSettingsById(id: string) {
        //return this.userSettingsModel.findOne(id);

        const user = await this.userModel
            .findOne({ _id: id })
            .populate('settings')
            .exec();

        // Check if the user exists and has linked settings
        if (!user || !user.settings) {
            return null;
        }

        return user.settings;
    }

    GetUserSettings() {
        return this.userSettingsModel.find();
    }



}