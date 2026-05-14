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
exports.RelationshipService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const relationship_schema_1 = require("../../schemas/relationship.schema");
let RelationshipService = class RelationshipService {
    constructor(relationshipModel) {
        this.relationshipModel = relationshipModel;
    }
    async createRelationship(createRelationshipDto, user) {
        try {
            const data = Object.assign(createRelationshipDto, { user: user._id });
            return await this.relationshipModel.create(data);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error creating relationship: ' + error.message);
        }
    }
    async findAll() {
        try {
            return await this.relationshipModel.find().exec();
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching relationships: ' + error.message);
        }
    }
    async findOne(id) {
        try {
            const relationship = await this.relationshipModel.findById(id).exec();
            if (!relationship) {
                throw new common_1.NotFoundException(`Relationship with ID ${id} not found`);
            }
            return relationship;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error fetching relationship: ' + error.message);
        }
    }
    async update(id, updateRelationshipDto, user) {
        try {
            const updated = await this.relationshipModel
                .findByIdAndUpdate(id, { ...updateRelationshipDto, user: user._id, updatedAt: new Date() }, { new: true, runValidators: true })
                .exec();
            if (!updated) {
                throw new common_1.NotFoundException(`Relationship with ID ${id} not found`);
            }
            return updated;
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error updating relationship: ' + error.message);
        }
    }
    async remove(id) {
        try {
            const result = await this.relationshipModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new common_1.NotFoundException(`Relationship with ID ${id} not found`);
            }
            return { deleted: true };
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Error deleting relationship: ' + error.message);
        }
    }
};
exports.RelationshipService = RelationshipService;
exports.RelationshipService = RelationshipService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(relationship_schema_1.RelationshipDetails.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], RelationshipService);
//# sourceMappingURL=relationship.service.js.map