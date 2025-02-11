import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCustomerDto } from 'src/invoicing/dto/customer-dto/create-customer..dto';
import { UpdateCustomerDto } from 'src/invoicing/dto/customer-dto/update-customer.dto';
import { CreateInvoiceDto } from 'src/invoicing/dto/invoice-dto/create-invoice.dto';
import { Customer } from 'src/invoicing/schemas/customer.schema';

@Injectable()
export class CustomerService {
    constructor(
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
    ) { }

    async createCustomer(createInvoiceDto: CreateCustomerDto): Promise<Customer> {

        const newCustomer = await this.customerModel.create(createInvoiceDto);
        return newCustomer;
    }


    async updateCustomer(id: string, updateCustomerDto: UpdateCustomerDto) {

        return await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();;

    }
}
