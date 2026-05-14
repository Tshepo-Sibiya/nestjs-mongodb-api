import { GymItem } from 'src/gym-buddy/schemas/gym-item.schema';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateGymItemDto } from 'src/gym-buddy/dto/gym-item';
export declare class GymItemService {
    private gymItemModel;
    private userModel;
    constructor(gymItemModel: Model<GymItem>, userModel: Model<User>);
    findAll(): Promise<GymItem[]>;
    findById(id: string): Promise<GymItem | null>;
    create(user: User, createGymItemDto: CreateGymItemDto): Promise<GymItem>;
    update(id: string, data: any): Promise<GymItem | null>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
