import { CreateGymItemDto, UpdateGymItemDto } from 'src/gym-buddy/dto/gym-item';
import { GymItemService } from 'src/gym-buddy/services/gym-item/gym-item.service';
export declare class GymItemController {
    private gymItemService;
    constructor(gymItemService: GymItemService);
    findAll(): Promise<import("../../schemas/gym-item.schema").GymItem[]>;
    findOne(id: string): Promise<import("../../schemas/gym-item.schema").GymItem | null>;
    create(req: any, createGymItemDto: CreateGymItemDto): Promise<import("../../schemas/gym-item.schema").GymItem>;
    update(id: string, updateGymItemDto: UpdateGymItemDto): Promise<import("../../schemas/gym-item.schema").GymItem | null>;
    remove(id: string): Promise<{
        success: boolean;
    }>;
}
