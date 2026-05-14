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
exports.GymItemController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const gym_item_1 = require("../../dto/gym-item");
const gym_item_service_1 = require("../../services/gym-item/gym-item.service");
let GymItemController = class GymItemController {
    constructor(gymItemService) {
        this.gymItemService = gymItemService;
    }
    async findAll() {
        return this.gymItemService.findAll();
    }
    async findOne(id) {
        return this.gymItemService.findById(id);
    }
    async create(req, createGymItemDto) {
        return this.gymItemService.create(req.user, createGymItemDto);
    }
    async update(id, updateGymItemDto) {
        try {
            const updatedItem = await this.gymItemService.update(id, updateGymItemDto);
            return updatedItem;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async remove(id) {
        return this.gymItemService.remove(id);
    }
};
exports.GymItemController = GymItemController;
__decorate([
    (0, common_1.Get)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GymItemController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymItemController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, gym_item_1.CreateGymItemDto]),
    __metadata("design:returntype", Promise)
], GymItemController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, gym_item_1.UpdateGymItemDto]),
    __metadata("design:returntype", Promise)
], GymItemController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], GymItemController.prototype, "remove", null);
exports.GymItemController = GymItemController = __decorate([
    (0, common_1.Controller)('gym-item'),
    __metadata("design:paramtypes", [gym_item_service_1.GymItemService])
], GymItemController);
//# sourceMappingURL=gym-item.controller.js.map