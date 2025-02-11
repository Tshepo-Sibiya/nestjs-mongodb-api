import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/invoicing/schemas/customer.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { Model } from 'mongoose';
import { CreateInvoiceDto } from 'src/invoicing/dto/invoice-dto/create-invoice.dto';

@Injectable()
export class InvoiceService {
    constructor(
        @InjectModel(Invoice.name) private invoiceModel: Model<Invoice>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
      ) {}

      async createInvoice(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
        const { amount, customerId } = createInvoiceDto;
    
        // Find the customer
        const customer = await this.customerModel.findById(customerId);
        if (!customer) {
          throw new NotFoundException('Customer not found');
        }
    
        // Create new invoice
        const newInvoice = new this.invoiceModel({
          amount,
          customer: customer._id,
        });
    
        return newInvoice.save();
      }

}
