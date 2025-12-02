import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CreateInvoiceSettingDto } from 'src/invoicing/dto/invoice-settings-dto/create-invoice-settings.dto';
import { UpdateInvoiceSettingsDto } from 'src/invoicing/dto/invoice-settings-dto/update-invoice-settings.dto';
import { InvoiceSettings } from 'src/invoicing/schemas/invoice-settings.schema';
import { Invoice } from 'src/invoicing/schemas/invoice.schema';
import { User } from 'src/user/schemas/user.schema';


@Injectable()
export class InvoiceSettingsService {

    constructor(
        @InjectModel(InvoiceSettings.name) private invoiceSettingsModel: Model<InvoiceSettings>,
        @InjectModel(User.name) private userModel: Model<User>
    ) {
    }

    async getInvoiceSettingsByUserId(id: string) {
        const invoiceSettings = await this.invoiceSettingsModel
            .findOne({ user: id }).exec();

        if (!invoiceSettings) {
            throw new NotFoundException('No invoice settings found for current user, create new settings.');
        }

        return invoiceSettings;
    }

    async createOrUpdateInvoiceSettings(user: User, settingsDto: CreateInvoiceSettingDto): Promise<InvoiceSettings> {
        const _user = await this.userModel.findById(user).exec();

        if (!_user) {
            throw new NotFoundException('User not found');
        }

        let userSettings = await this.invoiceSettingsModel.findOne({ user: user._id }).exec();

        if (userSettings) {
            // Update existing settings
            userSettings = Object.assign(userSettings, settingsDto);
            userSettings = await this.invoiceSettingsModel.findOneAndUpdate({ user: user._id }, userSettings, { new: true }).exec();
        } else {
            // Create new settings
            const data = Object.assign(settingsDto, { user: user._id });
            userSettings = await this.invoiceSettingsModel.create(data);
        }

        if (!userSettings) {
            throw new NotFoundException('Settings could not be created or updated');
        }
        return userSettings;
    }


    // async createOrUpdateInvoiceSettings(
    //     user: User,
    //     newInvoiceSettingsData: CreateInvoiceSettingDto
    // ): Promise<InvoiceSettings> {

    //     // Validate user
    //     const _user = await this.userModel.findById(user._id).exec();
    //     if (!_user) {
    //         throw new NotFoundException('User not found');
    //     }

    //     // Check if settings exist
    //     let invoiceSettings = await this.invoiceSettingsModel.findOne({ user: user._id }).exec();

    //     if (invoiceSettings != null) {
    //         // Update
    //         invoiceSettings = await this.invoiceSettingsModel.findOneAndUpdate(
    //             { user: user._id },
    //             { $set: newInvoiceSettingsData },
    //             { new: true }
    //         ).exec();
    //     } else {
    //         // Create new
    //         invoiceSettings = await this.invoiceSettingsModel.create({
    //             ...newInvoiceSettingsData,
    //             user: user._id,
    //         });
    //     }

    //     if (!invoiceSettings) {
    //         throw new NotFoundException('Failed to create or update invoice settings');
    //     }

    //     return invoiceSettings;
    // }



    // async updateInvoiceSettings(id: string, updateInvoiceSettingsDto: UpdateInvoiceSettingsDto, userId: string) {
    //     try {
    //         const updatedInvoiceSettings = await this.invoiceSettingsModel.findOneAndUpdate({_id: id, user: userId}, UpdateInvoiceSettingsDto, { new: true }).exec();

    //         if (!updatedInvoiceSettings) {
    //             throw new NotFoundException('Invoice settings not found');
    //         }
    //         return { 'Message': 'Invoice settings details successfully updated' };
    //     } catch (error) {
    //         throw new NotFoundException('Error updating invoice settings');
    //     }
    // }
}
