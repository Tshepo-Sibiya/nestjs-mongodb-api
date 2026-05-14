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
exports.AddressDetailsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const address_details_dto_1 = require("../../dto/address-details.dto");
const address_details_service_1 = require("../../services/address-details/address-details.service");
let AddressDetailsController = class AddressDetailsController {
    constructor(bankAcccountDetailsService) {
        this.bankAcccountDetailsService = bankAcccountDetailsService;
    }
    async getBankAccountDetails(req) {
        return this.bankAcccountDetailsService.GetUserAddressDetails(req.user._id);
    }
    async createOrUpdateAddressDetails(addressDetails, req) {
        return this.bankAcccountDetailsService.createOrUpdateAddressDetails(req.user, addressDetails);
    }
};
exports.AddressDetailsController = AddressDetailsController;
__decorate([
    (0, common_1.Get)('/getAddressDetails'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AddressDetailsController.prototype, "getBankAccountDetails", null);
__decorate([
    (0, common_1.Post)('/createOrUpdateAddressDetails'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_details_dto_1.AddressDetailsDto, Object]),
    __metadata("design:returntype", Promise)
], AddressDetailsController.prototype, "createOrUpdateAddressDetails", null);
exports.AddressDetailsController = AddressDetailsController = __decorate([
    (0, common_1.Controller)('address-details'),
    __metadata("design:paramtypes", [address_details_service_1.AddressDetailsService])
], AddressDetailsController);
//# sourceMappingURL=address-details.controller.js.map