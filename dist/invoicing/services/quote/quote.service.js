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
exports.QuoteService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const customer_schema_1 = require("../../schemas/customer.schema");
const mongoose_2 = require("mongoose");
const invoice_item_schema_1 = require("../../schemas/invoice-item.schema");
const quote_schema_1 = require("../../schemas/quote.schema");
let QuoteService = class QuoteService {
    constructor(quoteModel, invoiceItemModel, customerModel) {
        this.quoteModel = quoteModel;
        this.invoiceItemModel = invoiceItemModel;
        this.customerModel = customerModel;
    }
    async createQuote(user, createQuoteDto) {
        try {
            const customer = await this.customerModel.findOne({ user: user._id, _id: createQuoteDto.customerId }).exec();
            if (!customer) {
                throw new common_1.HttpException('Customer not found', 404);
            }
            const _assingedToCustomer = Object.assign(createQuoteDto, { customer: customer._id });
            const _data = Object.assign(_assingedToCustomer, { user: user._id });
            _data.quoteNumber = await this.generateQuoteNumber(user._id);
            const _newQuote = await this.quoteModel.create(_data);
            return _newQuote;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error creating quote: ' + error);
        }
    }
    async getQuotesByUserId(userId) {
        try {
            const Quotes = await this.quoteModel.find({ user: userId }).populate('customer').exec();
            if (!Quotes || Quotes.length === 0) {
                console.log('No quote found for current user!');
                return [];
            }
            return Quotes;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error retrieving quotes');
        }
    }
    async deleteQuote(id, userId) {
        const deletedQuote = await this.quoteModel.findOneAndDelete({ _id: id, user: userId }).exec();
        if (!deletedQuote) {
            throw new common_1.NotFoundException('Quote not found');
        }
        return { 'Message': 'Quote successfully deleted' };
    }
    async updateQuote(user, id, updateQuoteDto) {
        try {
            const customer = await this.customerModel.findOne({ user: user._id, _id: updateQuoteDto.customerId }).exec();
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            const _assingedToCustomer = Object.assign(updateQuoteDto, { customer: customer._id });
            const updatedQuote = await this.quoteModel.findOneAndUpdate({ _id: id }, _assingedToCustomer, { new: true }).exec();
            if (!updatedQuote) {
                throw new common_1.NotFoundException('No Quotes found for this user');
            }
            return { 'Message': 'Quote successfully updated' };
        }
        catch (error) {
            throw new common_1.NotFoundException('Error updating Quote: ' + error.message);
        }
    }
    async generateQuoteNumber(userId) {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const QuoteCount = await this.quoteModel.countDocuments({
            user: userId,
        });
        console.log('QuoteCount: ', QuoteCount);
        const increment = String(QuoteCount + 1).padStart(4, '0');
        return `QTE-${month}-${year}-${increment}`;
    }
};
exports.QuoteService = QuoteService;
exports.QuoteService = QuoteService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(quote_schema_1.Quote.name)),
    __param(1, (0, mongoose_1.InjectModel)(invoice_item_schema_1.InvoiceItem.name)),
    __param(2, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QuoteService);
//# sourceMappingURL=quote.service.js.map