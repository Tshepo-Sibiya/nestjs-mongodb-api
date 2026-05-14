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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const business_profile_dto_1 = require("./business-profile.dto");
const indidual_profile_dto_1 = require("./indidual-profile.dto");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['individual', 'business'], {
        message: 'userType must be either individual or business',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "userType", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => indidual_profile_dto_1.IndividualProfileDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", indidual_profile_dto_1.IndividualProfileDto)
], UpdateUserDto.prototype, "individualProfile", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => business_profile_dto_1.BusinessProfileDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", business_profile_dto_1.BusinessProfileDto)
], UpdateUserDto.prototype, "businessProfile", void 0);
//# sourceMappingURL=update-user.dto.js.map