import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Customer } from 'src/invoicing/schemas/customer.schema';

import { Model } from 'mongoose';
import { InvoiceItem } from 'src/invoicing/schemas/invoice-item.schema';
import { User } from 'src/auth/schemas/auth.schemas';

import { CreateQuoteDto } from 'src/invoicing/dto/quote-dto/create-quote.dto';
import { Quote } from 'src/invoicing/schemas/quote.schema';
import { UpdateQuoteDto } from 'src/invoicing/dto/quote-dto/update-quote.dto';

@Injectable()
export class QuoteService {
    constructor(
        @InjectModel(Quote.name) private quoteModel: Model<Quote>,
        @InjectModel(InvoiceItem.name) private invoiceItemModel: Model<InvoiceItem>,
        @InjectModel(Customer.name) private customerModel: Model<Customer>,
    ) { }



    async createQuote(user: User, createQuoteDto: CreateQuoteDto): Promise<Quote> {
        try {


            const customer = await this.customerModel.findOne({ user: user._id, _id: createQuoteDto.customerId }).exec();

            if (!customer) {
                throw new HttpException('Customer not found', 404);
            }

            const _assingedToCustomer = Object.assign(createQuoteDto, { customer: customer._id });

            const _data = Object.assign(_assingedToCustomer, { user: user._id });

            _data.quoteNumber = await this.generateQuoteNumber(user._id);

            const _newQuote = await this.quoteModel.create(_data);

            return _newQuote;

        } catch (error) {
            throw new NotFoundException('Error creating quote: ' + error);
        }
    }


    async getQuotesByUserId(userId: string) {
        try {
            const Quotes = await this.quoteModel.find({ user: userId }).populate('customer').exec();
            if (!Quotes || Quotes.length === 0) {
                console.log('No quote found for current user!');
                return [];
            }
            return Quotes;
        } catch (error) {
            throw new NotFoundException('Error retrieving quotes');
        }
    }

    async deleteQuote(id: string, userId: string) {
        const deletedQuote = await this.quoteModel.findOneAndDelete({_id: id, user: userId}).exec();
        if (!deletedQuote) {
            throw new NotFoundException('Quote not found');
        }
        return { 'Message': 'Quote successfully deleted' };
    }

    async updateQuote(user: User, id: string, updateQuoteDto: UpdateQuoteDto) {
        try {

            const customer = await this.customerModel.findOne({ user: user._id, _id: updateQuoteDto.customerId }).exec();

            if (!customer) {
                throw new NotFoundException('Customer not found');
            }

            const _assingedToCustomer = Object.assign(updateQuoteDto, { customer: customer._id });

            const updatedQuote = await this.quoteModel.findOneAndUpdate({_id: id}, _assingedToCustomer, { new: true }).exec();
            if (!updatedQuote) {
                throw new NotFoundException('No Quotes found for this user');
            }
            return { 'Message': 'Quote successfully updated' };
        } catch (error) {
            throw new NotFoundException('Error updating Quote: ' + error.message);
        }
    }

    async generateQuoteNumber(userId: any): Promise<string> {
        const now = new Date();
        const month = String(now.getMonth() + 1).padStart(2, '0'); // MM
        const year = now.getFullYear(); // YYYY

        // Count Quotes for the current user in the current month and year
        const QuoteCount = await this.quoteModel.countDocuments({
            user: userId,
        });
        console.log('QuoteCount: ', QuoteCount);
        // Increment the count by 1 for the new Quote
        const increment = String(QuoteCount + 1).padStart(4, '0'); // 0000

        // Format the Quote number
        return `QTE-${month}-${year}-${increment}`;
    }

}