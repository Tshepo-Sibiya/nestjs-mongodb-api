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
exports.FamilyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const family_schema_1 = require("../../schemas/family.schema");
let FamilyService = class FamilyService {
    constructor(familyModel) {
        this.familyModel = familyModel;
    }
    async createFamily(createFamilyDto, user) {
        try {
            const data = Object.assign(createFamilyDto, { user: user._id, createdBy: user._id });
            return await this.familyModel.create(data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating family: ' + error.message);
        }
    }
    async getAllFamilies(userId) {
        try {
            const families = await this.familyModel
                .find({ user: userId })
                .exec();
            if (!families || families.length === 0) {
                return [];
            }
            return families;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error retrieving families: ' + error.message);
        }
    }
    async getFamilyById(user, id) {
        try {
            const family = await this.familyModel
                .findOne({ _id: id, user: user._id })
                .exec();
            if (!family) {
                throw new common_1.NotFoundException(`Family with ID ${id} not found for this user`);
            }
            return family;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error retrieving family: ' + error.message);
        }
    }
    async updateFamily(user, id, updateFamilyDto) {
        try {
            const updatedFamily = await this.familyModel
                .findOneAndUpdate({ _id: id, user: user._id }, { ...updateFamilyDto, user: user._id, updatedAt: new Date() }, { new: true, runValidators: true })
                .exec();
            if (!updatedFamily) {
                throw new common_1.NotFoundException(`Family with ID ${id} not found for this user`);
            }
            return updatedFamily;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating family: ' + error.message);
        }
    }
    async removeFamily(user, id) {
        try {
            const deleted = await this.familyModel
                .findOneAndDelete({ _id: id, user: user._id })
                .exec();
            if (!deleted) {
                throw new common_1.NotFoundException(`Family with ID ${id} not found for this user`);
            }
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting family: ' + error.message);
        }
    }
};
exports.FamilyService = FamilyService;
exports.FamilyService = FamilyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(family_schema_1.FamilyDetails.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], FamilyService);
//# sourceMappingURL=family.service.js.map