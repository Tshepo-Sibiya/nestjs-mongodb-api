import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { Settings } from 'src/settings/schemas/settings.schemas';
import { Model } from 'mongoose';
import { UpdateUserSettingsDto } from 'src/users/dto/UpdateUserSettings.dto';
import { CreateUserSettingsDto } from 'src/users/dto/CreateUserSettings.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class SettingsService {
    constructor(@InjectModel(
        Settings.name) private settingsModel: Model<Settings>,
        @InjectModel(User.name) private userModel: Model<User>) {

    }

    async createSettings(user: User, settings: CreateUserSettingsDto): Promise<Settings> {
        // const newUserSettings = new this.userSettingsModel(createUserSettingsDto);
        // return newUserSettings.save();

        // const _user = await this.userModel.findById(id).exec();
        // console.log(user)
        // if (!user) {
        //     throw new NotFoundException('User not found');
        // }

        // Create and save new settings
        // const newSettings = new this.userSettingsModel(createUserSettingsDto);
        // const savedSettings = await newSettings.save();

        // Link the settings to the user

        // await user.save();

        //     return savedSettings;
        // const data = Object.assign(settings, { user: user._id });

        // const res = await this.userSettingsModel.create(data);
        // return res;

        const data = Object.assign(settings, { user: user });
        const savedSettings = await this.settingsModel.create(data);    
        return savedSettings;

        // Link the settings to the user
        // _user.settings = savedSettings.id;
        // await user.save();

    }

    // async UpdateUserSettings(id: string, updateUserSettinsDto: UpdateUserSettingsDto) {
    //     // return this.userSettingsModel.findByIdAndUpdate(id, updateUserSettinsDto, { new: true });

    //     const user = await this.userModel.findById(id).exec();
    //     if (!user) {
    //         throw new NotFoundException('User or user settings not found');
    //     }

    //     // Update settings document
    //     return this.userSettingsModel.findByIdAndUpdate(user.settings, updateUserSettinsDto, { new: true }).exec();
    // }

    // async GetUserSettingsById(id: string) {
    //     //return this.userSettingsModel.findOne(id);

    //     const user = await this.userModel
    //         .findOne({ _id: id })
    //         .populate('settings')
    //         .exec();

    //     // Check if the user exists and has linked settings
    //     if (!user) {
    //         return null;
    //     }

    //     return user.settings;
    // }

    async findAll(query: Query): Promise<Settings[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
    
        const keyword = query.keyword
          ? {
              title: {
                $regex: query.keyword,
                $options: 'i',
              },
            }
          : {};
    
        const books = await this.settingsModel
          .find({ ...keyword })
          .limit(resPerPage)
          .skip(skip);
        return books;
      }


}
