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
exports.FamilyMemberService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../../user/schemas/user.schema");
const mongoose_2 = require("mongoose");
const family_member_schema_1 = require("../../schemas/family-member.schema");
let FamilyMemberService = class FamilyMemberService {
    constructor(familyMemberDetailsModel, userModel) {
        this.familyMemberDetailsModel = familyMemberDetailsModel;
        this.userModel = userModel;
    }
    async createFamilyMember(createFamilyMemberDto, user) {
        try {
            const foundUser = await this.userModel.findById(user._id).exec();
            if (!foundUser) {
                throw new common_1.NotFoundException('User not found');
            }
            const data = Object.assign(createFamilyMemberDto, { user: user._id, createdBy: user._id });
            return await this.familyMemberDetailsModel.create(data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating family member: ' + error.message);
        }
    }
    async getAllFamilyMembers(userId) {
        try {
            const members = await this.familyMemberDetailsModel
                .find({ user: userId })
                .exec();
            if (!members || members.length === 0) {
                return [];
            }
            return members;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error retrieving family members: ' + error.message);
        }
    }
    async getFamilyMemberById(user, id) {
        try {
            const member = await this.familyMemberDetailsModel
                .findOne({ _id: id, createdBy: user._id })
                .exec();
            if (!member) {
                throw new common_1.NotFoundException(`Family member with ID ${id} not found for this user`);
            }
            return member;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error retrieving family member: ' + error.message);
        }
    }
    async updateFamilyMember(user, id, updateFamilyMemberDto) {
        try {
            const updatedMember = await this.familyMemberDetailsModel
                .findOneAndUpdate({ _id: id, user: user._id }, { ...updateFamilyMemberDto, user: user._id, updatedAt: new Date() }, { new: true, runValidators: true })
                .exec();
            if (!updatedMember) {
                throw new common_1.NotFoundException(`Family member with ID ${id} not found for this user`);
            }
            return updatedMember;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating family member: ' + error.message);
        }
    }
    async removeFamilyMember(user, id) {
        try {
            const deleted = await this.familyMemberDetailsModel
                .findOneAndDelete({ _id: id, user: user._id })
                .exec();
            if (!deleted) {
                throw new common_1.NotFoundException(`Family member with ID ${id} not found for this user`);
            }
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting family member: ' + error.message);
        }
    }
};
exports.FamilyMemberService = FamilyMemberService;
exports.FamilyMemberService = FamilyMemberService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(family_member_schema_1.FamilyMemberDetails.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], FamilyMemberService);
//# sourceMappingURL=family-member.service.js.map