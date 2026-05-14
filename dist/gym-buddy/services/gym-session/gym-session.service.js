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
exports.GymSessionService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../../user/schemas/user.schema");
let GymSessionService = class GymSessionService {
    constructor(gymSessionModel, userModel) {
        this.gymSessionModel = gymSessionModel;
        this.userModel = userModel;
    }
    async create(user, createGymSessionDto) {
        console.log('Creating gym session for user:', createGymSessionDto);
        const foundUser = await this.userModel.findById(user._id).exec();
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const data = {
            ...createGymSessionDto,
            user: user._id,
        };
        const newSession = await this.gymSessionModel.create(data);
        return newSession;
    }
    async findAll() {
        return this.gymSessionModel.find().exec();
    }
    async findOne(id) {
        return this.gymSessionModel.findById(id).exec();
    }
    async update(id, updateGymSessionDto) {
        return this.gymSessionModel
            .findByIdAndUpdate(id, { $set: updateGymSessionDto }, { new: true })
            .exec();
    }
    async remove(id) {
        await this.gymSessionModel.findByIdAndDelete(id).exec();
    }
};
exports.GymSessionService = GymSessionService;
exports.GymSessionService = GymSessionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('GymSession')),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], GymSessionService);
//# sourceMappingURL=gym-session.service.js.map