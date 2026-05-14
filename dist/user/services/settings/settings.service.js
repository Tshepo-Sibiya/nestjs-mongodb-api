"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const settings_schema_1 = require("../../schemas/settings.schema");
let SettingsService = class SettingsService {
    constructor(settingsModel, userModel) {
        this.settingsModel = settingsModel;
        this.userModel = userModel;
    }
    async createOrUpdateSettings(user, settingsDto) {
        const _user = await this.userModel.findById(user).exec();
        if (!_user) {
            throw new common_1.NotFoundException('User not found');
        }
        let userSettings = await this.settingsModel.findOne({ user: user._id }).exec();
        if (userSettings) {
            userSettings = Object.assign(userSettings, settingsDto);
            userSettings = await this.settingsModel.findOneAndUpdate({ user: user._id }, userSettings, { new: true }).exec();
        }
        else {
            const data = Object.assign(settingsDto, { user: user._id });
            userSettings = await this.settingsModel.create(data);
        }
        if (!userSettings) {
            throw new common_1.NotFoundException('Settings could not be created or updated');
        }
        return userSettings;
    }
    async GetSettingsById(id) {
        const settings = await this.settingsModel
            .findOne({ user: id })
            .exec();
        if (!settings) {
            throw new common_1.NotFoundException('No settings found for current user, create new settings.');
        }
        return settings;
    }
    async findAll(query) {
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
};
exports.SettingsService = SettingsService;
exports.SettingsService = SettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(settings_schema_1.Settings.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SettingsService);
//# sourceMappingURL=settings.service.js.map