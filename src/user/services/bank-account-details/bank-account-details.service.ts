import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';

import { Model } from 'mongoose';
import { BankAccountDetailsDto } from 'src/user/dto/bank-account-details.dto';
import { BankAccountDetails } from 'src/user/schemas/bank-account-details.schema';


@Injectable()
export class BankAccountDetailsService {


  constructor(
    @InjectModel(BankAccountDetails.name) private accountDetailsModel: Model<BankAccountDetails>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createOrUpdateBankAccountDetails(user: User, createBankAcccountDetailsDto: BankAccountDetailsDto): Promise<BankAccountDetails> {
    try {
      const _user = await this.userModel.findById(user).exec();

      if (!_user) {
        throw new NotFoundException('User not found');
      }

      let vatRate = await this.accountDetailsModel.findOne({ user: user._id }).exec();

      if (vatRate) {
        // Update existing settings
        vatRate = Object.assign(vatRate, createBankAcccountDetailsDto);
        vatRate = await this.accountDetailsModel.findOneAndUpdate({ user: user._id }, createBankAcccountDetailsDto, { new: true }).exec();
      } else {
        // Create new settings
        const data = Object.assign(createBankAcccountDetailsDto, { user: user._id });
        vatRate = await this.accountDetailsModel.create(data);
      }

      if (!vatRate) {
        throw new NotFoundException('Bank account details could not be created or updated');
      }
      return vatRate;
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  async GetBankAcccountDetailsById(id: string) {

    const vatRate = await this.accountDetailsModel
      .findOne({ user: id })
      .exec();
    if (!vatRate) {
      throw new NotFoundException('No Bank account details found for current user, create new Bank account details.');
    }
    return vatRate;

  }
  

}
