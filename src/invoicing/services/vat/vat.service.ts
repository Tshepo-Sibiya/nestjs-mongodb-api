import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import { VatDto } from 'src/invoicing/dto/vat-dto/vat-dto';
import { VatRate } from 'src/invoicing/schemas/vat.schema';
import { Model } from 'mongoose';

@Injectable()
export class VatService {


    constructor(
        @InjectModel(VatRate.name) private vatModel: Model<VatRate>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async createOrUpdateQuote(user: User, createVatRateDto: VatDto, id: string): Promise<VatRate> {
        try {


            const _user = await this.userModel.findById(user).exec();

            if (!_user) {
                throw new NotFoundException('User not found');
            }

            let vatRate = await this.vatModel.findOne({ user: user._id }).exec();

            if (vatRate) {
                // Update existing vat rate
                vatRate = Object.assign(vatRate, createVatRateDto);
                await vatRate.save();
            } else {
                // Create new vat rate
                const data = Object.assign(createVatRateDto, { user: user._id });
                vatRate = await this.vatModel.create(data);
            }

            return vatRate;
        } catch (error) {
            throw new NotFoundException('Error creating quote: ' + error);
        }
    }

    
}
