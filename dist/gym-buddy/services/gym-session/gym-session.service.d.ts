import { CreateGymSessionDto, UpdateGymSessionDto } from 'src/gym-buddy/dto/gym-session';
import { GymSession } from 'src/gym-buddy/schemas/gym-session.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';
export declare class GymSessionService {
    private readonly gymSessionModel;
    private userModel;
    constructor(gymSessionModel: Model<GymSession>, userModel: Model<User>);
    create(user: User, createGymSessionDto: CreateGymSessionDto): Promise<GymSession>;
    findAll(): Promise<GymSession[]>;
    findOne(id: string): Promise<GymSession | null>;
    update(id: string, updateGymSessionDto: UpdateGymSessionDto): Promise<GymSession | null>;
    remove(id: string): Promise<void>;
}
