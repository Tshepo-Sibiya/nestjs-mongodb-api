import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BankAccountDetailsDto } from 'src/user/dto/bank-account-details.dto';
import { User } from 'src/user/schemas/user.schemas';
import { Model } from 'mongoose';
import { AddressDetails } from 'src/user/schemas/address-details.schema';
import { AddressDetailsDto } from 'src/user/dto/address-details.dto';

@Injectable()
export class AddressDetailsService {
    constructor(
        @InjectModel(AddressDetails.name) private addressDetailsModel: Model<AddressDetails>,
        @InjectModel(User.name) private userModel: Model<User>
      ) { }
    
      async createOrUpdateAddressDetails(user: User, createAddressDetailsDto: AddressDetailsDto): Promise<AddressDetails> {
        try {
          const _user = await this.userModel.findById(user).exec();
    
          if (!_user) {
            throw new NotFoundException('User not found');
          }
    
          let vatRate = await this.addressDetailsModel.findOne({ user: user._id }).exec();
    
          if (vatRate) {
            // Update existing settings
            vatRate = Object.assign(vatRate, createAddressDetailsDto);
            vatRate = await this.addressDetailsModel.findOneAndUpdate({ user: user._id }, createAddressDetailsDto, { new: true }).exec();
          } else {
            // Create new settings
            const data = Object.assign(createAddressDetailsDto, { user: user._id });
            vatRate = await this.addressDetailsModel.create(data);
          }
    
          if (!vatRate) {
            throw new NotFoundException('Address details could not be created or updated');
          }
          return vatRate;
        } catch (error) {
          throw new HttpException(error.message, error.status || 500);
        }
      }
    
      async GetUserAddressDetails(id: string) {
    
        const vatRate = await this.addressDetailsModel
          .findOne({ user: id })
          .exec();
        if (!vatRate) {
          throw new NotFoundException('No address details found for current user, create new address details.');
        }
        return vatRate;
    
      }
}
