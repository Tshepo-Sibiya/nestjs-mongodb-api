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
exports.BankAccountDetailsController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const bank_account_details_dto_1 = require("../../dto/bank-account-details.dto");
const bank_account_details_service_1 = require("../../services/bank-account-details/bank-account-details.service");
let BankAccountDetailsController = class BankAccountDetailsController {
    constructor(bankAcccountDetailsService) {
        this.bankAcccountDetailsService = bankAcccountDetailsService;
    }
    async getBankAccountDetails(req) {
        return this.bankAcccountDetailsService.GetBankAcccountDetailsById(req.user._id);
    }
    async createOrUpdateBankAccountDetails(accountDetails, req) {
        return this.bankAcccountDetailsService.createOrUpdateBankAccountDetails(req.user, accountDetails);
    }
};
exports.BankAccountDetailsController = BankAccountDetailsController;
__decorate([
    (0, common_1.Get)('/getBankAccountDetails'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BankAccountDetailsController.prototype, "getBankAccountDetails", null);
__decorate([
    (0, common_1.Post)('/createOrUpdateBankAccountDetails'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bank_account_details_dto_1.BankAccountDetailsDto, Object]),
    __metadata("design:returntype", Promise)
], BankAccountDetailsController.prototype, "createOrUpdateBankAccountDetails", null);
exports.BankAccountDetailsController = BankAccountDetailsController = __decorate([
    (0, common_1.Controller)('bank-account-details'),
    __metadata("design:paramtypes", [bank_account_details_service_1.BankAccountDetailsService])
], BankAccountDetailsController);
//# sourceMappingURL=bank-account-details.controller.js.map