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
exports.InvoiceService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const customer_schema_1 = require("../../schemas/customer.schema");
const invoice_schema_1 = require("../../schemas/invoice.schema");
const mongoose_2 = require("mongoose");
const invoice_item_schema_1 = require("../../schemas/invoice-item.schema");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
const user_service_1 = require("../../../user/services/user/user.service");
let InvoiceService = class InvoiceService {
    constructor(invoiceModel, authService, invoiceItemModel, customerModel) {
        this.invoiceModel = invoiceModel;
        this.authService = authService;
        this.invoiceItemModel = invoiceItemModel;
        this.customerModel = customerModel;
    }
    async createInvoice(user, createInvoiceDto) {
        try {
            const customer = await this.customerModel.findOne({ user: user._id, _id: createInvoiceDto.customerId }).exec();
            if (!customer) {
                throw new common_1.HttpException('Customer not found', 404);
            }
            const _assingedToCustomer = Object.assign(createInvoiceDto, { customer: customer._id });
            const _data = Object.assign(_assingedToCustomer, { user: user._id });
            _data.invoiceNumber = await this.generateInvoiceNumber(user._id);
            const _newInvoice = await this.invoiceModel.create(_data);
            return _newInvoice;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error creating invoice: ' + error);
        }
    }
    async getInvoiceById(id, userId) {
        try {
            const invoice = await this.invoiceModel.findOne({ _id: id, user: userId }).populate('customer').exec();
            if (!invoice) {
                throw new common_1.NotFoundException('Invoice not found');
            }
            return invoice;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error retrieving invoice: ' + error.message);
        }
    }
    async getInvoicesByUserId(userId) {
        try {
            const invoices = await this.invoiceModel.find({ user: userId }).populate('customer').exec();
            if (!invoices || invoices.length === 0) {
                console.log('No invoices found for current user!');
                return [];
            }
            return invoices;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error retrieving invoices');
        }
    }
    async deleteInvoice(id, userId) {
        const deletedInvoice = await this.invoiceModel.findOneAndDelete({ _id: id, user: userId }).exec();
        if (!deletedInvoice) {
            throw new common_1.NotFoundException('Invoice not found');
        }
        return { 'Message': 'Invoice successfully deleted' };
    }
    async updateInvoice(user, id, updateInvoiceDto) {
        try {
            const customer = await this.customerModel.findOne({ user: user._id, _id: updateInvoiceDto.customerId }).exec();
            if (!customer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            const _assingedToCustomer = Object.assign(updateInvoiceDto, { customer: customer._id });
            const updatedInvoice = await this.invoiceModel.findOneAndUpdate({ _id: id }, _assingedToCustomer, { new: true }).exec();
            if (!updatedInvoice) {
                throw new common_1.NotFoundException('No invoices found for this user');
            }
            return { 'Message': 'Invoice successfully updated' };
        }
        catch (error) {
            throw new common_1.NotFoundException('Error updating invoice: ' + error.message);
        }
    }
    formatDate(date) {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }
    async generateInvoiceNumber(userId) {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        const invoiceCount = await this.invoiceModel.countDocuments({
            user: userId,
        });
        console.log('invoiceCount: ', invoiceCount);
        const increment = String(invoiceCount + 1).padStart(4, '0');
        return `INV-${month}-${year}-${increment}`;
    }
    async generatePDF(id, userId) {
        let invoice = await this.getInvoiceById(id, userId);
        let user = await this.authService.getProfileDetails(userId);
        const imagePath = '/Users/itdigitalsolutionssasfin/Documents/Tshepo Sibiya/Applications/APIs/nestjs-mongodb-demo/src/assets/image101.jpeg';
        const imageBase64 = fs.readFileSync(imagePath, 'base64');
        const imageSrc = `data:image/jpeg;base64,${imageBase64}`;
        const htmlContent = '';
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(htmlContent);
        const filePath = path.join(__dirname, 'invoices', `invoice-${invoice.invoiceNumber}.pdf`);
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        await page.pdf({ path: filePath, format: 'A4' });
        await browser.close();
        return filePath;
    }
};
exports.InvoiceService = InvoiceService;
exports.InvoiceService = InvoiceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(invoice_schema_1.Invoice.name)),
    __param(2, (0, mongoose_1.InjectModel)(invoice_item_schema_1.InvoiceItem.name)),
    __param(3, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_service_1.UserService,
        mongoose_2.Model,
        mongoose_2.Model])
], InvoiceService);
//# sourceMappingURL=invoice.service.js.map