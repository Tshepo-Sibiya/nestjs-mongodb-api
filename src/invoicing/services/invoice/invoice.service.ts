import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { Model } from 'mongoose';
import { InvoiceDto } from 'src/invoicing/dto/invoice-dto/invoice.dto';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/auth/schemas/auth.schemas';
import { UpdateInvoiceDto } from 'src/invoicing/dto/invoice-dto/update-invoice.dto';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(InvoiceItem.name) private invoiceItemModel: Model<InvoiceItem>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
    ) { }



    async createInvoice(user: User, createInvoiceDto: InvoiceDto): Promise<Invoice> {
        try {


            const customer = await this.customerModel.findOne({ user: user._id, _id: createInvoiceDto.customerId }).exec();

            if (!customer) {
                throw new HttpException('Customer not found', 404);
            }

            const _assingedToCustomer = Object.assign(createInvoiceDto, { customer: customer._id });

            const _data = Object.assign(_assingedToCustomer, { user: user._id });

            _data.invoiceNumber = await this.generateInvoiceNumber(user._id);

            const _newInvoice = await this.invoiceModel.create(_data);

            return _newInvoice;

        } catch (error) {
            throw new NotFoundException('Error creating invoice: ' + error);
        }
    }


    async getInvoicesByUserId(userId: string) {
        try {
            const invoices = await this.invoiceModel.find({ user: userId }).populate('customer').exec();
            if (!invoices || invoices.length === 0) {
                console.log('No invoices found for current user!');
                return [];
            }
            return invoices;
        } catch (error) {
            throw new NotFoundException('Error retrieving invoices');
        }
    }

    async deleteInvoice(id: string, userId: string) {
        const deletedInvoice = await this.invoiceModel.findOneAndDelete({_id: id, user: userId}).exec();
        if (!deletedInvoice) {
            throw new NotFoundException('Invoice not found');
        }
        return { 'Message': 'Invoice successfully deleted' };
    }

    async updateInvoice(user: User, id: string, updateInvoiceDto: UpdateInvoiceDto) {
        try {

            const customer = await this.customerModel.findOne({ user: user._id, _id: updateInvoiceDto.customerId }).exec();

            if (!customer) {
                throw new NotFoundException('Customer not found');
            }

            const _assingedToCustomer = Object.assign(updateInvoiceDto, { customer: customer._id });

            const updatedInvoice = await this.invoiceModel.findOneAndUpdate({_id: id}, _assingedToCustomer, { new: true }).exec();
            if (!updatedInvoice) {
                throw new NotFoundException('No invoices found for this user');
            }
            return { 'Message': 'Invoice successfully updated' };
        } catch (error) {
            throw new NotFoundException('Error updating invoice: ' + error.message);
        }
    }

    async generateInvoiceNumber(userId: any): Promise<string> {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // MM
        const year = now.getFullYear(); // YYYY

        // Count invoices for the current user in the current month and year
        const invoiceCount = await this.invoiceModel.countDocuments({
            user: userId,
        });
        console.log('invoiceCount: ', invoiceCount);
        // Increment the count by 1 for the new invoice
        const increment = String(invoiceCount + 1).padStart(4, '0'); // 0000

        // Format the invoice number
        return `INV-${month}-${year}-${increment}`;
    }

}


