import { User } from 'src/user/schemas/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/user/dto/login.dto';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { Individual } from 'src/user/schemas/individual.schema';
import { Business } from 'src/user/schemas/business.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AddressDetails } from 'src/user/schemas/address-details.schema';
export declare class UserService {
    private userModel;
    private individualModel;
    private addressDetailsModel;
    private businessModel;
    private jwtService;
    private redisClient;
    constructor(userModel: Model<User>, individualModel: Model<Individual>, addressDetailsModel: Model<AddressDetails>, businessModel: Model<Business>, jwtService: JwtService);
    signUp(createUserDto: CreateUserDto): Promise<any>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    revokeToken(token: string): Promise<void>;
    getProfileDetails(userId: string): Promise<any>;
    updateUserdetails(id: string, userUpdateDto: UpdateUserDto): Promise<User>;
}
