import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "src/schemas/User.schema";
import { Model } from "mongoose";
import { CreateUserDto } from "./dto/CreateUser.dto";
import { UpdateUserDto } from "./dto/UpdateUser.dto";


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
        return this.userModel.find();
    }

    getUserById(id: string) {
        return this.userModel.findById(id);
    }

    deleteUser(id: string) { 
        return this.userModel.findByIdAndDelete(id);
    }


}