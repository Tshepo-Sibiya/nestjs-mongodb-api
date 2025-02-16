import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/user/schemas/user.schemas';
import { Model } from 'mongoose';

import * as bcrypt from 'bcrypt';
import { SignUpDto } from 'src/user/dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {

  }

  async signUp(signUpDto: SignUpDto): Promise<any> {

    const { firstname, lastname, email, password, title, initials } = signUpDto;

    const _user = await this.userModel.findOne({ email });
    if (_user != null) {
      throw new ConflictException('Email already taken.');
    }

    const user = await this.userModel.create({
      firstname,
      lastname,
      title,
      initials,
      email,
      password: await bcrypt.hash(password, 10)
    });

    const token = this.jwtService.sign({ id: user._id });

    return { user };
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

  async getProfileDetails(userId: string) {
    try {
      const user = await this.userModel.findById(userId).lean().exec();
      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    } catch (error) {
      throw new UnauthorizedException('Could not retrieve user profile');
    }
  }

  async updateUserdetails(id: string, userUpdateDto: UpdateUserDto): Promise<User> {

    const newUserDetails = await this.userModel.findOneAndUpdate({ _id: id }, userUpdateDto, { new: true }).exec();

    if (!newUserDetails) {
      throw new NotFoundException('User not found after update');
    }
    return newUserDetails;
  }

}
