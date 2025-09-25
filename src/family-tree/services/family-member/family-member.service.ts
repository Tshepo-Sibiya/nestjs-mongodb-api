import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';

import { CreateFamilyMemberDetailsDto } from 'src/family-tree/dto/family-member/create-family-member.dto';
import { FamilyMemberDetails } from 'src/family-tree/schemas/family-member.schema';
import { UpdateFamilyMemberDto } from 'src/family-tree/dto/family-member/update-family-member.dto';


@Injectable()
export class FamilyMemberService {
  constructor(
    @InjectModel(FamilyMemberDetails.name)
    private readonly familyMemberDetailsModel: Model<FamilyMemberDetails>,
    @InjectModel(User.name) private userModel: Model<User>
  ) { }

  /** CREATE */
  async createFamilyMember(
    createFamilyMemberDto: CreateFamilyMemberDetailsDto,
    user: User,
  ): Promise<FamilyMemberDetails> {
    try {

      const foundUser = await this.userModel.findById(user._id).exec();

      if (!foundUser) {
        throw new NotFoundException('User not found');
      }

      const data = Object.assign(createFamilyMemberDto, { user: user._id, createdBy: user._id });

      return await this.familyMemberDetailsModel.create(data);
    } catch (error) {
      throw new InternalServerErrorException(
        'Error creating family member: ' + error.message,
      );
    }
  }

  /** READ ALL (for a specific user) */
  async getAllFamilyMembers(userId: string): Promise<FamilyMemberDetails[]> {
    try {
      const members = await this.familyMemberDetailsModel
        .find({ user: userId })
        .exec();

      if (!members || members.length === 0) {
        return [];
      }
      return members;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving family members: ' + error.message,
      );
    }
  }

  /** READ ONE */
  async getFamilyMemberById(
    user: User,
    id: string,
  ): Promise<FamilyMemberDetails> {
    try {
      const member = await this.familyMemberDetailsModel
        .findOne({ _id: id, createdBy: user._id })
        .exec();

      if (!member) {
        throw new NotFoundException(
          `Family member with ID ${id} not found for this user`,
        );
      }

      return member;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error retrieving family member: ' + error.message,
      );
    }
  }

  /** UPDATE */
  async updateFamilyMember(
    user: User,
    id: string,
    updateFamilyMemberDto: UpdateFamilyMemberDto,
  ): Promise<FamilyMemberDetails> {
    try {
      const updatedMember = await this.familyMemberDetailsModel
        .findOneAndUpdate(
          { _id: id, user: user._id },
          { ...updateFamilyMemberDto, user: user._id, updatedAt: new Date() },
          { new: true, runValidators: true },
        )
        .exec();

      if (!updatedMember) {
        throw new NotFoundException(
          `Family member with ID ${id} not found for this user`,
        );
      }

      return updatedMember;
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating family member: ' + error.message,
      );
    }
  }

  /** DELETE */
  async removeFamilyMember(
    user: User,
    id: string,
  ): Promise<{ deleted: boolean }> {
    try {
      const deleted = await this.familyMemberDetailsModel
        .findOneAndDelete({ _id: id, user: user._id })
        .exec();

      if (!deleted) {
        throw new NotFoundException(
          `Family member with ID ${id} not found for this user`,
        );
      }

      return { deleted: true };
    } catch (error) {
      throw new InternalServerErrorException(
        'Error deleting family member: ' + error.message,
      );
    }
  }
}
