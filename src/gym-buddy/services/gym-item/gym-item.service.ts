import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GymItem } from 'src/gym-buddy/schemas/gym-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateGymItemDto } from 'src/gym-buddy/dto/gym-item';
import { Customer } from 'src/invoicing/schemas/customer.schema';

@Injectable()
export class GymItemService {

    constructor(
        @InjectModel(GymItem.name) private gymItemModel: Model<GymItem>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async findAll(): Promise<GymItem[]> {
        // Retrieve all gym items
        return this.gymItemModel.find().exec();
    }

    async findById(id: string): Promise<GymItem | null> {
        // Find gym item by ID
        return this.gymItemModel.findById(id).exec();
    }

    async create(user: User, createGymItemDto: CreateGymItemDto): Promise<GymItem> {
        console.log('Creating gym item for user:', createGymItemDto);
        const foundUser = await this.userModel.findById(user._id).exec();

        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        const data = {
            ...createGymItemDto,
            user: user._id,
        };

        const newCustomer = await this.gymItemModel.create(data);
        return newCustomer;
    }

    async update(id: string, data: any): Promise<GymItem | null> {
        // Update gym item and return the updated document
        const updated = await this.gymItemModel.findByIdAndUpdate(id, data, { new: true }).exec();
        if (!updated) throw new Error('Gym item not found');
        return updated;
    }

    async remove(id: string): Promise<{ success: boolean }> {
        // Delete gym item
        const deleted = await this.gymItemModel.findByIdAndDelete(id).exec();
        return { success: !!deleted };
    }
}
