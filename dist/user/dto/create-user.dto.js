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
exports.CreateUserDto = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const business_profile_dto_1 = require("./business-profile.dto");
const indidual_profile_dto_1 = require("./indidual-profile.dto");
const swagger_1 = require("@nestjs/swagger");
const address_details_dto_1 = require("./address-details.dto");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['individual', 'business'], {
        message: 'userType must be either individual or business',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "userType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'example@mail.com',
        description: 'This is the email addresss of the user.',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)({}, { message: 'Invalid email' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, swagger_1.ApiProperty)({
        example: '0727401058',
        description: 'This is the phone number of the user.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phoneNumber", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(6),
    (0, swagger_1.ApiProperty)({
        example: '@Password123',
        description: 'This is password of the user.',
    }),
    (0, class_validator_1.Matches)(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/, {
        message: 'Password must contain at least one uppercase letter, one number, and one special character.',
    }),
    (0, class_validator_1.MaxLength)(20, { message: 'Password cannot be longer than 20 characters.' }),
    (0, class_validator_1.IsNotIn)(['password', '123456', 'qwerty'], {
        message: 'Password is too common.',
    }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => indidual_profile_dto_1.IndividualProfileDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", indidual_profile_dto_1.IndividualProfileDto)
], CreateUserDto.prototype, "individualProfile", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => business_profile_dto_1.BusinessProfileDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", business_profile_dto_1.BusinessProfileDto)
], CreateUserDto.prototype, "businessProfile", void 0);
__decorate([
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => address_details_dto_1.AddressDetailsDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", address_details_dto_1.AddressDetailsDto)
], CreateUserDto.prototype, "addressDetails", void 0);
//# sourceMappingURL=create-user.dto.js.map