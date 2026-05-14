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
exports.AddressDetailsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const address_details_schema_1 = require("../../schemas/address-details.schema");
let AddressDetailsService = class AddressDetailsService {
    constructor(addressDetailsModel, userModel) {
        this.addressDetailsModel = addressDetailsModel;
        this.userModel = userModel;
    }
    async createOrUpdateAddressDetails(user, createAddressDetailsDto) {
        try {
            const _user = await this.userModel.findById(user).exec();
            if (!_user) {
                throw new common_1.NotFoundException('User not found');
            }
            let vatRate = await this.addressDetailsModel.findOne({ user: user._id }).exec();
            if (vatRate) {
                vatRate = Object.assign(vatRate, createAddressDetailsDto);
                vatRate = await this.addressDetailsModel.findOneAndUpdate({ user: user._id }, createAddressDetailsDto, { new: true }).exec();
            }
            else {
                const data = Object.assign(createAddressDetailsDto, { user: user._id });
                vatRate = await this.addressDetailsModel.create(data);
            }
            if (!vatRate) {
                throw new common_1.NotFoundException('Address details could not be created or updated');
            }
            return vatRate;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, error.status || 500);
        }
    }
    async GetUserAddressDetails(id) {
        const vatRate = await this.addressDetailsModel
            .findOne({ user: id })
            .exec();
        if (!vatRate) {
            throw new common_1.NotFoundException('No address details found for current user, create new address details.');
        }
        return vatRate;
    }
};
exports.AddressDetailsService = AddressDetailsService;
exports.AddressDetailsService = AddressDetailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(address_details_schema_1.AddressDetails.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], AddressDetailsService);
//# sourceMappingURL=address-details.service.js.map