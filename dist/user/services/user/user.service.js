"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../../schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const individual_schema_1 = require("../../schemas/individual.schema");
const business_schema_1 = require("../../schemas/business.schema");
const jwt = require("jsonwebtoken");
const ioredis_1 = require("ioredis");
const address_details_schema_1 = require("../../schemas/address-details.schema");
let UserService = class UserService {
    constructor(userModel, individualModel, addressDetailsModel, businessModel, jwtService) {
        this.userModel = userModel;
        this.individualModel = individualModel;
        this.addressDetailsModel = addressDetailsModel;
        this.businessModel = businessModel;
        this.jwtService = jwtService;
        this.redisClient = new ioredis_1.Redis();
    }
    async signUp(createUserDto) {
        const { userType, businessProfile, individualProfile, addressDetails, email, password } = createUserDto;
        const existingUser = await this.userModel.findOne({ email });
        if (existingUser) {
            throw new common_1.ConflictException('Email already taken.');
        }
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
        savedUser.addressDetails = address._id;
        if (userType === 'individual') {
            const individual = await this.individualModel.create({
                ...individualProfile,
                user: savedUser._id,
            });
            savedUser.individualProfile = individual._id;
        }
        else if (userType === 'business') {
            const business = await this.businessModel.create({
                ...businessProfile,
                user: savedUser._id,
            });
            savedUser.businessProfile = business._id;
        }
        else {
            throw new common_1.BadRequestException('Invalid userType');
        }
        await savedUser.save();
        return {
            message: 'User successfully created.',
        };
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if (!isPasswordMatched) {
            throw new common_1.UnauthorizedException('Invalid email or password');
        }
        const token = this.jwtService.sign({ id: user._id });
        return { token };
    }
    async revokeToken(token) {
        const decoded = jwt.decode(token);
        const expiresIn = decoded.exp - Math.floor(Date.now() / 1000);
        if (expiresIn > 0) {
            await this.redisClient.set(token, 'revoked', 'EX', expiresIn);
        }
    }
    async getProfileDetails(userId) {
        try {
            const user = await this.userModel.findById(userId).lean().exec();
            if (!user) {
                throw new common_1.UnauthorizedException('User not found');
            }
            let populatedUser;
            if (user.userType === 'individual') {
                populatedUser = await this.userModel
                    .findById(userId)
                    .populate({ path: 'individualProfile', model: 'Individual' })
                    .populate({ path: 'addressDetails', model: 'AddressDetails' })
                    .lean()
                    .exec();
            }
            else if (user.userType === 'business') {
                populatedUser = await this.userModel
                    .findById(userId)
                    .populate({ path: 'businessProfile', model: 'Business' })
                    .populate({ path: 'addressDetails', model: 'AddressDetails' })
                    .lean()
                    .exec();
            }
            else {
                populatedUser = await this.userModel
                    .findById(userId)
                    .populate({ path: 'addressDetails', model: 'AddressDetails' })
                    .lean()
                    .exec();
            }
            const { password, ...userWithoutPassword } = populatedUser;
            return userWithoutPassword;
        }
        catch (error) {
            console.log("Error is: " + error);
            throw new common_1.UnauthorizedException('Could not retrieve user profile');
        }
    }
    async updateUserdetails(id, userUpdateDto) {
        const { userType, businessProfile, individualProfile, ...updateData } = userUpdateDto;
        const updatedUser = await this.userModel.findOneAndUpdate({ _id: id }, updateData, { new: true })
            .populate(userType == 'business' ? { path: 'businessProfile', model: 'Business' } : { path: 'individualProfile', model: 'Individual' })
            .exec();
        if (!updatedUser) {
            throw new common_1.NotFoundException('User not found after update');
        }
        if (userType === 'individual' && individualProfile) {
            const updatedIndividual = await this.individualModel.findOneAndUpdate({ user: id }, individualProfile, { new: true }).exec();
            if (updatedIndividual) {
                updatedUser.individualProfile = updatedIndividual._id;
            }
        }
        else if (userType === 'business' && businessProfile) {
            const updatedBusiness = await this.businessModel.findOneAndUpdate({ user: id }, businessProfile, { new: true }).exec();
            if (updatedBusiness) {
                updatedUser.businessProfile = updatedBusiness._id;
            }
        }
        return updatedUser;
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)(individual_schema_1.Individual.name)),
    __param(2, (0, mongoose_1.InjectModel)(address_details_schema_1.AddressDetails.name)),
    __param(3, (0, mongoose_1.InjectModel)(business_schema_1.Business.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map