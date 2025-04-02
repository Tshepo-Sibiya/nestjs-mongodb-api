import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schema';
import mongoose, { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Individual } from 'src/user/schemas/individual.schema';
import { Business } from 'src/user/schemas/business.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import * as jwt from 'jsonwebtoken';
import { Redis } from 'ioredis';
import { AddressDetails } from 'src/user/schemas/address-details.schema';
import { Address } from 'cluster';

@Injectable()
export class UserService {
  private redisClient = new Redis();
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Individual.name) private individualModel: Model<Individual>,
    @InjectModel(AddressDetails.name) private addressDetailsModel: Model<AddressDetails>,
    @InjectModel(Business.name) private businessModel: Model<Business>,
    private jwtService: JwtService
  ) {

  }

  async signUp(createUserDto: CreateUserDto): Promise<any> {
    const { userType, businessProfile, individualProfile, addressDetails, email, password } = createUserDto;

    // Check if email already exists
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already taken.');
    }

    // Create the User first
    let user = new this.userModel({
      email,
      password: await bcrypt.hash(password, 10),
      userType,
    });
    let savedUser = await user.save();

    const address = await this.addressDetailsModel.create({
      ...addressDetails,
      user: savedUser._id,
    });
    savedUser.addressDetails = address._id as any as mongoose.Types.ObjectId;

    // Create Profile and link to User
    if (userType === 'individual') {
      const individual = await this.individualModel.create({
        ...individualProfile,
        user: savedUser._id,
      });

      savedUser.individualProfile = individual._id;
    } else if (userType === 'business') {
      const business = await this.businessModel.create({
        ...businessProfile,
        user: savedUser._id,
      });
      savedUser.businessProfile = business._id;
    } else {
      throw new BadRequestException('Invalid userType');
    }


    // Save User with profile reference
    await savedUser.save();

    // Generate JWT Token


    return {
      message: 'User successfully created.',
    };
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return { token };
  }

  async revokeToken(token: string) {
    const decoded: any = jwt.decode(token);
    const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);

    if (expiresIn > 0) {
      await this.redisClient.set(token, 'revoked', 'EX', expiresIn);
    }
  }

  async getProfileDetails(userId: string) {
    try {
      // Fetch the user to check the userType first
      const user = await this.userModel.findById(userId).lean().exec();

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      // Determine which profile to populate
      let populatedUser;
      if (user.userType === 'individual') {
        populatedUser = await this.userModel
          .findById(userId)
          .populate({ path: 'individualProfile', model: 'Individual' })
          .populate({ path: 'addressDetails', model: 'AddressDetails' })
          .lean()
          .exec();
      } else if (user.userType === 'business') {
        populatedUser = await this.userModel
          .findById(userId)
          .populate({ path: 'businessProfile', model: 'Business' })
          .populate({ path: 'addressDetails', model: 'AddressDetails' })
          .lean()
          .exec();
      } else {
        populatedUser = await this.userModel
          .findById(userId)
          .populate({ path: 'addressDetails', model: 'AddressDetails' })
          .lean()
          .exec();
      }

      // Exclude the password from the response
      const { password, ...userWithoutPassword } = populatedUser;
      return userWithoutPassword;
    } catch (error) {
      console.log("Error is: "  + error);
      throw new UnauthorizedException('Could not retrieve user profile');
    }
  }



  async updateUserdetails(id: string, userUpdateDto: UpdateUserDto): Promise<User> {
    const { userType, businessProfile, individualProfile, ...updateData } = userUpdateDto;
  
    // Update the User first
    const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, updateData, { new: true })
      .populate(userType == 'business' ? { path: 'businessProfile', model: 'Business' } : { path: 'individualProfile', model: 'Individual' })
      .exec();
  
    if (!updatedUser) {
      throw new NotFoundException('User not found after update');
    }
  
    // Update Profile based on userType
    if (userType === 'individual' && individualProfile) {
      const updatedIndividual = await this.individualModel.findOneAndUpdate({ user: id }, individualProfile, { new: true }).exec();
      if (updatedIndividual) {
        updatedUser.individualProfile = updatedIndividual._id;
      }
    } else if (userType === 'business' && businessProfile) {
      const updatedBusiness = await this.businessModel.findOneAndUpdate({ user: id }, businessProfile, { new: true }).exec();
      if (updatedBusiness) {
        updatedUser.businessProfile = updatedBusiness._id;
      }
    }
  
    return updatedUser;
  }
  

}
