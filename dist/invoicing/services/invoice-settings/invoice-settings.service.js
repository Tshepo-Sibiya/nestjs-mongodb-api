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
exports.InvoiceSettingsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const invoice_settings_schema_1 = require("../../schemas/invoice-settings.schema");
const user_schema_1 = require("../../../user/schemas/user.schema");
let InvoiceSettingsService = class InvoiceSettingsService {
    constructor(invoiceSettingsModel, userModel) {
        this.invoiceSettingsModel = invoiceSettingsModel;
        this.userModel = userModel;
    }
    async getInvoiceSettingsByUserId(id) {
        const invoiceSettings = await this.invoiceSettingsModel
            .findOne({ user: id }).exec();
        if (!invoiceSettings) {
            throw new common_1.NotFoundException('No invoice settings found for current user, create new settings.');
        }
        return invoiceSettings;
    }
    async createOrUpdateInvoiceSettings(user, settingsDto) {
        const _user = await this.userModel.findById(user).exec();
        if (!_user) {
            throw new common_1.NotFoundException('User not found');
        }
        let userSettings = await this.invoiceSettingsModel.findOne({ user: user._id }).exec();
        if (userSettings) {
            userSettings = Object.assign(userSettings, settingsDto);
            userSettings = await this.invoiceSettingsModel.findOneAndUpdate({ user: user._id }, userSettings, { new: true }).exec();
        }
        else {
            const data = Object.assign(settingsDto, { user: user._id });
            userSettings = await this.invoiceSettingsModel.create(data);
        }
        if (!userSettings) {
            throw new common_1.NotFoundException('Settings could not be created or updated');
        }
        return userSettings;
    }
};
exports.InvoiceSettingsService = InvoiceSettingsService;
exports.InvoiceSettingsService = InvoiceSettingsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_settings_schema_1.InvoiceSettings.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], InvoiceSettingsService);
//# sourceMappingURL=invoice-settings.service.js.map