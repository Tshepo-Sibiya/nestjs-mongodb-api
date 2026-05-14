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
exports.FamilyController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const create_family_dto_1 = require("../../dto/family/create-family.dto");
const update_family_dto_1 = require("../../dto/family/update-family.dto");
const family_service_1 = require("../../services/family/family.service");
let FamilyController = class FamilyController {
    constructor(familyService) {
        this.familyService = familyService;
    }
    createFamilyMember(req, createDto) {
        return this.familyService.createFamily(createDto, req.user);
    }
    findAll(req) {
        return this.familyService.getAllFamilies(req.user._id);
    }
    findOne(req, id) {
        return this.familyService.getFamilyById(req.user, id);
    }
    update(req, id, updateDto) {
        return this.familyService.updateFamily(req.user, id, updateDto);
    }
    remove(req, id) {
        return this.familyService.removeFamily(req.user, id);
    }
};
exports.FamilyController = FamilyController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new family' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Family successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_family_dto_1.CreateFamilyDetailsDto]),
    __metadata("design:returntype", void 0)
], FamilyController.prototype, "createFamilyMember", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all families for current user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of families returned.' }),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], FamilyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get family by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FamilyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update family by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_family_dto_1.UpdateFamilyDetailsDto]),
    __metadata("design:returntype", void 0)
], FamilyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete family by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Family successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Family not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], FamilyController.prototype, "remove", null);
exports.FamilyController = FamilyController = __decorate([
    (0, swagger_1.ApiTags)('family'),
    (0, common_1.Controller)('family'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [family_service_1.FamilyService])
], FamilyController);
//# sourceMappingURL=family.controller.js.map