import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer..dto';
import { UpdateCustomerDto } from 'src/invoicing/dto/customer-dto/update-customer.dto';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
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


    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto, userId: string) {
        try {
            const updatedCustomer = await this.customerModel.findOneAndUpdate({_id: id, user: userId}, updateCustomerDto, { new: true }).exec();
            console.log('Here: ' + updatedCustomer);
            if (!updatedCustomer) {
                throw new NotFoundException('Customer not found');
            }
            return { 'Message': 'Customer details successfully updated' };
        } catch (error) {
            throw new NotFoundException('Error updating customer');
        }
    }


    async getCustomersByUserId(userId: string) {
        try {
            const customers = await this.customerModel.find({ user: userId }).exec();
            if (!customers || customers.length === 0) {
                throw new NotFoundException('No customers found for this user');
            }
            return customers;
        } catch (error) {
            throw new NotFoundException('Error retrieving customers');
        }
    }

    async deleteCustomer(id: string, userId: string) {
        const deletedCustomer = await this.customerModel.findByIdAndDelete({_id: id, user: userId}).exec();
        if (!deletedCustomer) {
            throw new NotFoundException('Customer not found');
        }
        return { 'Message': 'Customer deleted successfully' };
    }
}
