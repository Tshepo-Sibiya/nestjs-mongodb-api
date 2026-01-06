import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGymSessionDto, UpdateGymSessionDto } from 'src/gym-buddy/dto/gym-session';
import { GymSession } from 'src/gym-buddy/schemas/gym-session.schema';
import { Model } from 'mongoose';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class GymSessionService {
    constructor(
        @InjectModel('GymSession') private readonly gymSessionModel: Model<GymSession>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }

    async create(user: User, createGymSessionDto: CreateGymSessionDto): Promise<GymSession> {
        console.log('Creating gym session for user:', createGymSessionDto);
        const foundUser = await this.userModel.findById(user._id).exec();

        if (!foundUser) {
            throw new NotFoundException('User not found');
        }

        const data = {
            ...createGymSessionDto,
            user: user._id,
        };

        const newSession = await this.gymSessionModel.create(data);
        return newSession;
    }

    async findAll(): Promise<GymSession[]> {
        return this.gymSessionModel.find().exec();
    }

    async findOne(id: string): Promise<GymSession | null> {
        return this.gymSessionModel.findById(id).exec();
    }

    async update(id: string, updateGymSessionDto: UpdateGymSessionDto): Promise<GymSession | null> {
        return this.gymSessionModel
            .findByIdAndUpdate(id, { $set: updateGymSessionDto }, { new: true })
            .exec();
    }

    async remove(id: string): Promise<void> {
        await this.gymSessionModel.findByIdAndDelete(id).exec();
    }
}
