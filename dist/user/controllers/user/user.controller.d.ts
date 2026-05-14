import { LoginDto } from 'src/user/dto/login.dto';
import { UserService } from 'src/user/services/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';
import { User } from 'src/user/schemas/user.schema';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
export declare class UserController {
    private authService;
    constructor(authService: UserService);
    signUp(signUpDto: CreateUserDto): Promise<{
        token: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
    }>;
    getProfileDetails(req: any): Promise<any>;
    updateUserDetails(req: any, updateUser: UpdateUserDto): Promise<User>;
}
