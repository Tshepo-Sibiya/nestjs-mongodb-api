import { Injectable, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateRelationshipDto } from 'src/family-tree/dto/ralationship/create-relationship.dto';
import { UpdateRelationshipDto } from 'src/family-tree/dto/ralationship/update-relationship.dto';
import { RelationshipDetails } from 'src/family-tree/schemas/relationship.schema';
import { User } from 'src/user/schemas/user.schema';

@Injectable()
export class RelationshipService {
    constructor(
        @InjectModel(RelationshipDetails.name)
        private readonly relationshipModel: Model<RelationshipDetails>,
    ) { }

    /** CREATE */
    async createRelationship(
        createRelationshipDto: CreateRelationshipDto,
        user: User,
    ): Promise<RelationshipDetails> {
        try {
            const data = Object.assign(createRelationshipDto, { user: user._id });
            return await this.relationshipModel.create(data);
        } catch (error) {
            throw new InternalServerErrorException(
                'Error creating relationship: ' + error.message,
            );
        }
    }

    /** READ ALL */
    async findAll(): Promise<RelationshipDetails[]> {
        try {
            return await this.relationshipModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException(
                'Error fetching relationships: ' + error.message,
            );
        }
    }

    /** READ ONE */
    async findOne(id: string): Promise<RelationshipDetails> {
        try {
            const relationship = await this.relationshipModel.findById(id).exec();
            if (!relationship) {
                throw new NotFoundException(`Relationship with ID ${id} not found`);
            }
            return relationship;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error fetching relationship: ' + error.message,
            );
        }
    }

    /** UPDATE */
    async update(
        id: string,
        updateRelationshipDto: UpdateRelationshipDto,
        user: User,
    ): Promise<RelationshipDetails> {
        try {
            const updated = await this.relationshipModel
                .findByIdAndUpdate(
                    id,
                    { ...updateRelationshipDto, user: user._id, updatedAt: new Date() },
                    { new: true, runValidators: true },
                )
                .exec();

            if (!updated) {
                throw new NotFoundException(`Relationship with ID ${id} not found`);
            }
            return updated;
        } catch (error) {
            throw new InternalServerErrorException(
                'Error updating relationship: ' + error.message,
            );
        }
    }

    /** DELETE */
    async remove(id: string): Promise<{ deleted: boolean }> {
        try {
            const result = await this.relationshipModel.findByIdAndDelete(id).exec();
            if (!result) {
                throw new NotFoundException(`Relationship with ID ${id} not found`);
            }
            return { deleted: true };
        } catch (error) {
            throw new InternalServerErrorException(
                'Error deleting relationship: ' + error.message,
            );
        }
    }
}
