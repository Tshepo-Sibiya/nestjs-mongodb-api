import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { UserSettings } from "src/schemas/userSettings.schema";
import { UpdateUserSettingsDto } from "../dto/UpdateUserSettings.dto";
import { CreateUserSettingsDto } from "../dto/CreateUserSettings.dto";
import { User } from "src/schemas/user.schema";


@Injectable()
export class UserSettingsService {
    constructor(@InjectModel(
        UserSettings.name) private userSettingsModel: Model<UserSettings>,
        @InjectModel(User.name) private userModel: Model<User>) {

    }

    async createUserSettings(id: string, createUserSettingsDto: CreateUserSettingsDto) {
        // const newUserSettings = new this.userSettingsModel(createUserSettingsDto);
        // return newUserSettings.save();

        const user = await this.userModel.findById(id).exec();
        console.log(user)
        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Ensure user doesn't already have settings
        if (user.settings) {
            throw new ConflictException('User already has settings');
        }

        // Create and save new settings
        const newSettings = new this.userSettingsModel(createUserSettingsDto);
        const savedSettings = await newSettings.save();

        // Link the settings to the user
        user.settings = savedSettings.id;
        await user.save();

        return savedSettings;
    }

    async UpdateUserSettings(id: string, updateUserSettinsDto: UpdateUserSettingsDto) {
        // return this.userSettingsModel.findByIdAndUpdate(id, updateUserSettinsDto, { new: true });

        const user = await this.userModel.findById(id).exec();
        if (!user || !user.settings) {
            throw new NotFoundException('User or user settings not found');
        }

        // Update settings document
        return this.userSettingsModel.findByIdAndUpdate(user.settings, updateUserSettinsDto, { new: true }).exec();
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