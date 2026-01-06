import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateGymSessionDto, UpdateGymSessionDto } from 'src/gym-buddy/dto/gym-session';
import { GymSession } from 'src/gym-buddy/schemas/gym-session.schema';
import { Model } from 'mongoose';

@Injectable()
export class GymSessionService {
    constructor(
        @InjectModel('GymSession') private readonly gymSessionModel: Model<GymSession>,
    ) {}

    async create(createGymSessionDto: CreateGymSessionDto): Promise<GymSession> {
        const created = new this.gymSessionModel(createGymSessionDto);
        return created.save();
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
