import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';
import { VatRate } from 'src/invoicing/schemas/vat.schema';
import { Model } from 'mongoose';

@Injectable()
export class VatRateService {


  constructor(
    @InjectModel(VatRate.name) private vatModel: Model<VatRate>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  async createOrUpdateQuote(user: User, createVatRateDto: VatDto): Promise<VatRate> {
    const _user = await this.userModel.findById(user).exec();

    if (!_user) {
      throw new NotFoundException('User not found');
    }

    let vatRate = await this.vatModel.findOne({ user: user._id }).exec();

    if (vatRate) {
      // Update existing settings
      vatRate = Object.assign(vatRate, createVatRateDto);
      vatRate = await this.vatModel.findOneAndUpdate({ user: user._id }, createVatRateDto, { new: true }).exec();
    } else {
      // Create new settings
      const data = Object.assign(createVatRateDto, { user: user._id });
      vatRate = await this.vatModel.create(data);
    }

    if (!vatRate) {
      throw new NotFoundException('Vat rate could not be created or updated');
    }
    return vatRate;
  }

  async GetUserVatRateById(id: string) {

    const vatRate = await this.vatModel
      .findOne({ user: id })
      .populate('user')
      .exec();
    if (!vatRate) {
      throw new NotFoundException('No vat rate found for current user, create new vat rate.');
    }
    return vatRate;

  }
  

}
