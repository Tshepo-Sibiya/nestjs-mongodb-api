import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { Settings } from 'src/settings/schemas/settings.schema';
import { Model } from 'mongoose';
import { UpdateUserSettingsDto } from 'src/users/dto/update-user-settings.dto';
import { CreateUserSettingsDto } from 'src/users/dto/create-user-settings.dto';
import { Query } from 'express-serve-static-core';

@Injectable()
export class SettingsService {
  constructor(@InjectModel(
    Settings.name) private settingsModel: Model<Settings>,
    @InjectModel(User.name) private userModel: Model<User>) {

  }

  // async createSettings(user: User, settings: CreateUserSettingsDto): Promise<Settings> {


  //     const _user = await this.userModel.findById(user).exec();
  //     console.log(user)
  //     if (user != null) {
  //         throw new NotFoundException('User not found');
  //     }

  //     const data = Object.assign(settings, { user: user });
  //     const savedSettings = await this.settingsModel.create(data);    
  //     return savedSettings;


  // }
  async createOrUpdateSettings(user: User, settingsDto: CreateUserSettingsDto): Promise<Settings> {
    const _user = await this.userModel.findById(user).exec();

    if (!_user) {
      throw new NotFoundException('User not found');
    }

    let userSettings = await this.settingsModel.findOne({ user: user._id }).exec();

    if (userSettings) {
      // Update existing settings
      userSettings = Object.assign(userSettings, settingsDto);
      userSettings = await this.settingsModel.findOneAndUpdate({ user: user._id }, userSettings, { new: true }).exec();
    } else {
      // Create new settings
      const data = Object.assign(settingsDto, { user: user._id });
      userSettings = await this.settingsModel.create(data);
    }

    if (!userSettings) {
      throw new NotFoundException('Settings could not be created or updated');
    }
    return userSettings;
  }

  async GetUserSettingsById(id: string) {

    const settings = await this.settingsModel
      .findOne({ user: id })
      .populate('user')
      .exec();
    if (!settings) {
      throw new NotFoundException('No settings found for current user, create new settings.');
    }
    return settings;

  }

  async findAll(query: Query): Promise<Settings[]> {
    const resPerPage = 10;
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
