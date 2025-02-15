import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { Model } from 'mongoose';
import { InvoiceItemDto } from 'src/invoicing/dto/invoice-item-dto/invoice-item.dto';
import { User } from 'src/auth/schemas/auth.schemas';


@Injectable()
export class InvoiceItemService {
    constructor(

        @InjectModel(InvoiceItem.name) private invoiceItemModel: Model<InvoiceItem>,

    ) { }


    async createInvoiceItem(user: User, createInvoiceItemDto: InvoiceItemDto): Promise<InvoiceItem> {
        try {

            const _data = Object.assign(createInvoiceItemDto, { user: user });

            const _newInvoice = await this.invoiceItemModel.create(_data);

            return _newInvoice;

        } catch (error) {

            throw new NotFoundException('Error creating invoice: ' + error.message);

        }

    }

    async deleteInvoiceItem(id: string) {
        const deletedInvoice = await this.invoiceItemModel.findByIdAndDelete(id).exec();
        if (!deletedInvoice) {
            throw new NotFoundException('Invoice item not found');
        }
        return { 'Message': 'Invoice item successfully deleted' };
    }

    async updateInvoiceItem(user: User, id: string, updateInvoiceItemDto: InvoiceItemDto) {
        try {


            const _assingedToUser = Object.assign(updateInvoiceItemDto, { user: user._id });

            const updatedInvoiceItem = await this.invoiceItemModel.findOneAndUpdate({ _id: id }, _assingedToUser, { new: true }).exec();
            if (!updatedInvoiceItem) {
                throw new NotFoundException('No invoice item not found');
            }
            return { 'Message': 'Invoice item successfully updated' };
        } catch (error) {
            throw new NotFoundException('Error updating invoice: ' + error.message);
        }
    }

    async getInvoiceItems(userId: string) {
        try {
            const invoices = await this.invoiceItemModel.find({ user: userId }).exec();
            if (!invoices || invoices.length === 0) {
                console.log('No invoice items found for current user!');
                return [];
            }
            return invoices;
        } catch (error) {

            throw new NotFoundException('Error retrieving invoice items: ' + error.message);

        }
    }

}
