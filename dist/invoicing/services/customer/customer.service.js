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
exports.CustomerService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../../user/schemas/user.schema");
const customer_schema_1 = require("../../schemas/customer.schema");
let CustomerService = class CustomerService {
    constructor(customerModel, userModel) {
        this.customerModel = customerModel;
        this.userModel = userModel;
    }
    async createCustomer(user, createCustomerDto) {
        const foundUser = await this.userModel.findById(user._id).exec();
        if (!foundUser) {
            throw new common_1.NotFoundException('User not found');
        }
        const data = {
            ...createCustomerDto,
            user: user._id,
            address: createCustomerDto.address ? { ...createCustomerDto.address } : undefined,
        };
        const newCustomer = await this.customerModel.create(data);
        return newCustomer;
    }
    async updateCustomer(id, updateCustomerDto, userId) {
        try {
            const updatedCustomer = await this.customerModel.findOneAndUpdate({ _id: id, user: userId }, updateCustomerDto, { new: true }).exec();
            console.log('Here: ' + updatedCustomer);
            if (!updatedCustomer) {
                throw new common_1.NotFoundException('Customer not found');
            }
            return { 'Message': 'Customer details successfully updated' };
        }
        catch (error) {
            throw new common_1.NotFoundException('Error updating customer');
        }
    }
    async getCustomersByUserId(userId) {
        try {
            const customers = await this.customerModel.find({ user: userId }).exec();
            if (!customers || customers.length === 0) {
                throw new common_1.NotFoundException('No customers found for this user');
            }
            return customers;
        }
        catch (error) {
            throw new common_1.NotFoundException('Error retrieving customers');
        }
    }
    async deleteCustomer(id, userId) {
        const deletedCustomer = await this.customerModel.findOneAndDelete({ _id: id, user: userId }).exec();
        if (!deletedCustomer) {
            throw new common_1.NotFoundException('Customer not found');
        }
        return { 'Message': 'Customer deleted successfully' };
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(customer_schema_1.Customer.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], CustomerService);
//# sourceMappingURL=customer.service.js.map