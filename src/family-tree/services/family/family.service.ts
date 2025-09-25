import {
    Injectable,
    NotFoundException,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateFamilyDetailsDto } from 'src/family-tree/dto/family/create-family.dto';
import { UpdateFamilyDetailsDto } from 'src/family-tree/dto/family/update-family.dto';

import { FamilyDetails } from 'src/family-tree/schemas/family.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class FamilyService {
    constructor(
        @InjectModel(FamilyDetails.name)
        private readonly familyModel: Model<FamilyDetails>,
    ) { }

    /** CREATE */
    async createFamily(
        createFamilyDto: CreateFamilyDetailsDto,
        user: User,
    ): Promise<FamilyDetails> {
        try {
            const data = Object.assign(createFamilyDto, { user: user._id, createdBy: user._id });
            return await this.familyModel.create(data);
        } catch (error) {
            throw new InternalServerErrorException(
                'Error creating family: ' + error.message,
            );
        }
    }

    /** READ ALL (for a specific user) */
    async getAllFamilies(userId: string): Promise<FamilyDetails[]> {
        try {
            const families = await this.familyModel
                .find({ user: userId })
                .exec();

            if (!families || families.length === 0) {
                return [];
            }
            return families;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error retrieving families: ' + error.message,
            );
        }
    }

    /** READ ONE */
    async getFamilyById(user: User, id: string): Promise<FamilyDetails> {
        try {
            const family = await this.familyModel
                .findOne({ _id: id, user: user._id })
                .exec();

            if (!family) {
                throw new NotFoundException(
                    `Family with ID ${id} not found for this user`,
                );
            }

            return family;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error retrieving family: ' + error.message,
            );
        }
    }

    /** UPDATE */
    async updateFamily(
        user: User,
        id: string,
        updateFamilyDto: UpdateFamilyDetailsDto,
    ): Promise<FamilyDetails> {
        try {
            const updatedFamily = await this.familyModel
                .findOneAndUpdate(
                    { _id: id, user: user._id },
                    { ...updateFamilyDto, user: user._id, updatedAt: new Date() },
                    { new: true, runValidators: true },
                )
                .exec();

            if (!updatedFamily) {
                throw new NotFoundException(
                    `Family with ID ${id} not found for this user`,
                );
            }

            return updatedFamily;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error updating family: ' + error.message,
            );
        }
    }

    /** DELETE */
    async removeFamily(user: User, id: string): Promise<{ deleted: boolean }> {
        try {
            const deleted = await this.familyModel
                .findOneAndDelete({ _id: id, user: user._id })
                .exec();

            if (!deleted) {
                throw new NotFoundException(
                    `Family with ID ${id} not found for this user`,
                );
            }

            return { deleted: true };
        } catch (error) {
            throw new InternalServerErrorException(
                'Error deleting family: ' + error.message,
            );
        }
    }
}
