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
exports.RelationshipController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const swagger_1 = require("@nestjs/swagger");
const create_relationship_dto_1 = require("../../dto/ralationship/create-relationship.dto");
const update_relationship_dto_1 = require("../../dto/ralationship/update-relationship.dto");
const relationship_service_1 = require("../../services/relationship/relationship.service");
let RelationshipController = class RelationshipController {
    constructor(relationshipService) {
        this.relationshipService = relationshipService;
    }
    createRelationship(req, createDto) {
        return this.relationshipService.createRelationship(createDto, req.user);
    }
    findAll() {
        return this.relationshipService.findAll();
    }
    findOne(id) {
        return this.relationshipService.findOne(id);
    }
    update(req, id, updateDto) {
        return this.relationshipService.update(id, updateDto, req.user);
    }
    remove(id) {
        return this.relationshipService.remove(id);
    }
};
exports.RelationshipController = RelationshipController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new relationship' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Relationship successfully created.' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Invalid input.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_relationship_dto_1.CreateRelationshipDto]),
    __metadata("design:returntype", void 0)
], RelationshipController.prototype, "createRelationship", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all relationships' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of relationships returned.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], RelationshipController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get relationship by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relationship found.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relationship not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationshipController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update relationship by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relationship successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relationship not found.' }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_relationship_dto_1.UpdateRelationshipDto]),
    __metadata("design:returntype", void 0)
], RelationshipController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete relationship by ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Relationship successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Relationship not found.' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], RelationshipController.prototype, "remove", null);
exports.RelationshipController = RelationshipController = __decorate([
    (0, swagger_1.ApiTags)('Relationship'),
    (0, common_1.Controller)('relationship'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __metadata("design:paramtypes", [relationship_service_1.RelationshipService])
], RelationshipController);
//# sourceMappingURL=relationship.controller.js.map