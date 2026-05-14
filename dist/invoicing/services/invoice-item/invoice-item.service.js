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
exports.InvoiceItemService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const invoice_item_schema_1 = require("../../schemas/invoice-item.schema");
const mongoose_2 = require("mongoose");
let InvoiceItemService = class InvoiceItemService {
    constructor(invoiceItemModel) {
        this.invoiceItemModel = invoiceItemModel;
    }
    async createInvoiceItem(user, createInvoiceItemDto) {
        try {
            const _data = Object.assign(createInvoiceItemDto, { user: user });
            const _newInvoice = await this.invoiceItemModel.create(_data);
            return _newInvoice;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error creating invoice: ' + error.message);
        }
    }
    async deleteInvoiceItem(id, userId) {
        const deletedInvoice = await this.invoiceItemModel.findOneAndDelete({ _id: id, user: userId }).exec();
        if (!deletedInvoice) {
            throw new common_1.NotFoundException('Invoice item not found');
        }
        return { 'Message': 'Invoice item successfully deleted' };
    }
    async updateInvoiceItem(user, id, updateInvoiceItemDto) {
        try {
            const _assingedToUser = Object.assign(updateInvoiceItemDto, { user: user._id });
            const updatedInvoiceItem = await this.invoiceItemModel.findOneAndUpdate({ _id: id }, _assingedToUser, { new: true }).exec();
            if (!updatedInvoiceItem) {
                throw new common_1.NotFoundException('No invoice item not found');
            }
            return { 'Message': 'Invoice item successfully updated' };
        }
        catch (error) {
            throw new common_1.NotFoundException('Error updating invoice: ' + error.message);
        }
    }
    async getInvoiceItems(userId) {
        try {
            const invoices = await this.invoiceItemModel.find({ user: userId }).exec();
            if (!invoices || invoices.length === 0) {
                console.log('No invoice items found for current user!');
                return [];
            }
            return invoices;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error retrieving invoice items: ' + error.message);
        }
    }
};
exports.InvoiceItemService = InvoiceItemService;
exports.InvoiceItemService = InvoiceItemService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_item_schema_1.InvoiceItem.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], InvoiceItemService);
//# sourceMappingURL=invoice-item.service.js.map