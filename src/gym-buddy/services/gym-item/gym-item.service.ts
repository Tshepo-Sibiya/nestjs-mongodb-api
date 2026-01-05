import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { GymItem } from 'src/gym-buddy/schemas/gym-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

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

    async create(data: any): Promise<GymItem> {
        // If a user reference is provided, ensure the user exists
        if (data.userId) {
            const user = await this.userModel.findById(data.userId).exec();
            if (!user) throw new Error('User not found');
        }

        const created = new this.gymItemModel(data);
        return created.save();
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
