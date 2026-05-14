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
exports.InvoiceItemController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const create_invoice_item_dto_1 = require("../../dto/invoice-item-dto/create-invoice-item.dto");
const invoice_item_service_1 = require("../../services/invoice-item/invoice-item.service");
let InvoiceItemController = class InvoiceItemController {
    constructor(invoiceItemService) {
        this.invoiceItemService = invoiceItemService;
    }
    async create(createInvoiceItemDto, req) {
        return await this.invoiceItemService.createInvoiceItem(req.user, createInvoiceItemDto);
    }
    async updateInvoiceItem(updateInvoiceItemDto, id, req) {
        try {
            return await this.invoiceItemService.updateInvoiceItem(req.user, id, updateInvoiceItemDto);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async getInvoiceItems(req) {
        try {
            return await this.invoiceItemService.getInvoiceItems(req.user._id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deleteInvoiceItem(req, id) {
        try {
            return await this.invoiceItemService.deleteInvoiceItem(id, req.user._id);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.InvoiceItemController = InvoiceItemController;
__decorate([
    (0, common_1.Post)('/createInvoiceItem'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_item_dto_1.InvoiceItemDto, Object]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)('/updateInvoiceItem/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_invoice_item_dto_1.InvoiceItemDto, String, Object]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "updateInvoiceItem", null);
__decorate([
    (0, common_1.Get)('/getInvoiceItems'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "getInvoiceItems", null);
__decorate([
    (0, common_1.Delete)('/deleteInvoiceItem/:id'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)()),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], InvoiceItemController.prototype, "deleteInvoiceItem", null);
exports.InvoiceItemController = InvoiceItemController = __decorate([
    (0, common_1.Controller)('invoice-item'),
    __metadata("design:paramtypes", [invoice_item_service_1.InvoiceItemService])
], InvoiceItemController);
//# sourceMappingURL=invoice-item.controller.js.map