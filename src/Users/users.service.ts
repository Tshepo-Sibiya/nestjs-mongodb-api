import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";



@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {

    }

    createUser(createUserDto: CreateUserDto) {
        const newUser = new this.userModel(createUserDto);
        return newUser.save();
    }

    UpdateUser(id: string, updateUserDto: UpdateUserDto) {

        return this.userModel.findByIdAndUpdate(id, updateUserDto, {new: true});
    }

    getUsers() {
        return this.userModel.find().populate('settings');
    }

    getUserById(id: string) {
        return this.userModel.findById(id).populate('settings');
    }

    deleteUser(id: string) { 
        return this.userModel.findByIdAndDelete(id);
    }


}