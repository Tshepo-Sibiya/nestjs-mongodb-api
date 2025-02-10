import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/auth/schemas/auth.schemas';
import {Model} from 'mongoose'; 

import * as bcrypt from 'bcrypt';   
import { SignUpDto } from 'src/auth/dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/auth/dto/login.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private jwtService: JwtService
    ) { 

    }

    async signUp(signUpDto: SignUpDto): Promise<any> {

        const { firstname, lastname, email, password } = signUpDto;

        const _user = await this.userModel.findOne({ email });
        if(_user != null) {
            throw new ConflictException('Email already taken.');
        }

        const user = await this.userModel.create({
            firstname,
            lastname,
            email,
            password: await bcrypt.hash(password, 10)
        });

        const token = this.jwtService.sign({id: user._id});

        return { token };    
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
}
