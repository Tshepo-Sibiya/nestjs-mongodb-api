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
exports.GymItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const gym_item_schema_1 = require("../../schemas/gym-item.schema");
const user_schema_1 = require("../../../user/schemas/user.schema");
const mongoose_2 = require("mongoose");
let GymItemService = class GymItemService {
    constructor(gymItemModel, userModel) {
        this.gymItemModel = gymItemModel;
        this.userModel = userModel;
    }
    async findAll() {
        return this.gymItemModel.find().exec();
    }
    async findById(id) {
        return this.gymItemModel.findById(id).exec();
    }
    async create(user, createGymItemDto) {
        console.log('Creating gym item for user:', createGymItemDto);
        const foundUser = await this.userModel.findById(user._id).exec();
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const data = {
            ...createGymItemDto,
            user: user._id,
        };
        const newCustomer = await this.gymItemModel.create(data);
        return newCustomer;
    }
    async update(id, data) {
        const updated = await this.gymItemModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updated)
            throw new Error('Gym item not found');
        return updated;
    }
    async remove(id) {
        const deleted = await this.gymItemModel.findByIdAndDelete(id).exec();
        return { success: !!deleted };
    }
};
exports.GymItemService = GymItemService;
exports.GymItemService = GymItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(gym_item_schema_1.GymItem.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GymItemService);
//# sourceMappingURL=gym-item.service.js.map