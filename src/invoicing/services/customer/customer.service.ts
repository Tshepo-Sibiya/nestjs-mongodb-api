import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer..dto';
import { UpdateCustomerDto } from 'src/invoicing/dto/customer-dto/update-customer.dto';
import { CreateInvoiceDto } from 'src/invoicing/dto/invoice-dto/create-invoice.dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async createCustomer(user: User, createInvoiceDto: CreateCustomerDto): Promise<Customer> {
        const foundUser = await this.userModel.findById(user._id).exec();

        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        const data = Object.assign(createInvoiceDto, { user: user._id });
        let newCustomer = await this.customerModel.create(data);
        return newCustomer;

    }


    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {
        return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();;
    }


    async getCustomersByUserId(userId: string) {
        console.log(userId)
        return await this.customerModel.find({ user: userId }).exec();
    }
}
