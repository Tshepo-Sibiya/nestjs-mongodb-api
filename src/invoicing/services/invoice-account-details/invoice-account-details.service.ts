import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';

import { Model } from 'mongoose';
import { InvoiceAccountDetails } from 'src/invoicing/schemas/invoice-account-details.schema';
import { InvoiceAccountDetailsDto } from 'src/invoicing/dto/invoice-account-details-dto/invoice-account-details';

@Injectable()
export class InvoiceAcccountDetailsService {


  constructor(
    @InjectModel(InvoiceAccountDetails.name) private invoiceAccountDetailsModel: Model<InvoiceAccountDetails>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createOrUpdateInvoiceAccountDetails(user: User, createInvoiceAcccountDetailsDto: InvoiceAccountDetailsDto): Promise<InvoiceAccountDetails> {
    try {
      const _user = await this.userModel.findById(user).exec();

      if (!_user) {
        throw new NotFoundException('User not found');
      }

      let vatRate = await this.invoiceAccountDetailsModel.findOne({ user: user._id }).exec();

      if (vatRate) {
        // Update existing settings
        vatRate = Object.assign(vatRate, createInvoiceAcccountDetailsDto);
        vatRate = await this.invoiceAccountDetailsModel.findOneAndUpdate({ user: user._id }, createInvoiceAcccountDetailsDto, { new: true }).exec();
      } else {
        // Create new settings
        const data = Object.assign(createInvoiceAcccountDetailsDto, { user: user._id });
        vatRate = await this.invoiceAccountDetailsModel.create(data);
      }

      if (!vatRate) {
        throw new NotFoundException('Invoice account details could not be created or updated');
      }
      return vatRate;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async GetUserInvoiceAcccountDetailsById(id: string) {

    const vatRate = await this.invoiceAccountDetailsModel
      .findOne({ user: id })
      .populate('user')
      .exec();
    if (!vatRate) {
      throw new NotFoundException('No Invoice account details found for current user, create new Invoice account details.');
    }
    return vatRate;

  }
  

}
