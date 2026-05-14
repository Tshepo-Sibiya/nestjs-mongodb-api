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
exports.FamilyMemberController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const family_member_service_1 = require("../../services/family-member/family-member.service");
const create_family_member_dto_1 = require("../../dto/family-member/create-family-member.dto");
const update_family_member_dto_1 = require("../../dto/family-member/update-family-member.dto");
let FamilyMemberController = class FamilyMemberController {
    constructor(familyMemberService) {
        this.familyMemberService = familyMemberService;
    }
    createFamily(req, createDto) {
        return this.familyMemberService.createFamilyMember(createDto, req.user);
    }
    findAll(req) {
        return this.familyMemberService.getAllFamilyMembers(req.user._id);
    }
    findOne(req, id) {
        return this.familyMemberService.getFamilyMemberById(req.user, id);
    }
    update(req, id, updateDto) {
        return this.familyMemberService.updateFamilyMember(req.user, id, updateDto);
    }
    remove(req, id) {
        return this.familyMemberService.removeFamilyMember(req.user, id);
    }
};
exports.FamilyMemberController = FamilyMemberController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new family member' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Family member successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_family_member_dto_1.CreateFamilyMemberDetailsDto]),
    __metadata("design:returntype", void 0)
], FamilyMemberController.prototype, "createFamily", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all family member for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of family member returned.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FamilyMemberController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get family member by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family member found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FamilyMemberController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update family member by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family memeber successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_family_member_dto_1.UpdateFamilyMemberDto]),
    __metadata("design:returntype", void 0)
], FamilyMemberController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete family member by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family member successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family member not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FamilyMemberController.prototype, "remove", null);
exports.FamilyMemberController = FamilyMemberController = __decorate([
    (0, common_1.Controller)('family-member'),
    (0, swagger_1.ApiTags)('family-member'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [family_member_service_1.FamilyMemberService])
], FamilyMemberController);
//# sourceMappingURL=family-member.controller.js.map