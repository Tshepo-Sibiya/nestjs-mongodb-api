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
exports.QuoteSchema = exports.Quote = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("mongoose");
const customer_schema_1 = require("./customer.schema");
const invoice_status_enum_1 = require("../enums/invoice-status.enum");
let Quote = class Quote {
};
exports.Quote = Quote;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Quote.prototype, "quoteNumber", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Number)
], Quote.prototype, "totalAmount", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Quote.prototype, "dueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Quote.prototype, "issueDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", Date)
], Quote.prototype, "expiryDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        required: true,
        enum: Object.values(invoice_status_enum_1.InvoiceStatus),
        type: String,
        default: invoice_status_enum_1.InvoiceStatus.DRAFT,
    }),
    __metadata("design:type", String)
], Quote.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", String)
], Quote.prototype, "notes", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: [{ type: mongoose_3.Types.ObjectId, ref: 'InvoiceItem' }] }),
    __metadata("design:type", Array)
], Quote.prototype, "invoiceItems", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Types.ObjectId, ref: 'Customer', required: true }),
    __metadata("design:type", customer_schema_1.Customer)
], Quote.prototype, "customer", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: mongoose_3.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", mongoose_3.Types.ObjectId)
], Quote.prototype, "user", void 0);
exports.Quote = Quote = __decorate([
    (0, mongoose_1.Schema)({
        timestamps: true
    })
], Quote);
exports.QuoteSchema = mongoose_1.SchemaFactory.createForClass(Quote);
//# sourceMappingURL=quote.schema.js.map