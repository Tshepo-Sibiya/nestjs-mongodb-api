import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from './services/user/user.service';
import { JwtStrategy } from './strategy/jwt.strategy';
import { SettingsService } from './services/settings/settings.service';
import { SettingsController } from './controllers/settings/settings.controller';
import { Settings, SettingsSchema } from './schemas/settings.schema';
import { BankAccountDetails, BankAccountDetailsSchema } from './schemas/bank-account-details.schema';
import { BankAccountDetailsService } from './services/bank-account-details/bank-account-details.service';
import { BankAccountDetailsController } from './controllers/bank-account-details/bank-account-details.controller';
import { UserController } from './controllers/user/user.controller';
import { AddressDetailsController } from './controllers/address-details/address-details.controller';
import { AddressDetailsService } from './services/address-details/address-details.service';
import { AddressDetails, AddressDetailsSchema } from './schemas/address-details.schema';



@Module({
    imports: [

        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.registerAsync({
            inject: [ConfigService],
            useFactory: (config: ConfigService) => {
                return {
                    secret: config.get<string>('JWT_SECRET'),
                    signOptions: {
                        expiresIn: config.get<string | number>('JWT_EXPIRES_IN'),
                    }
                };
            }
        }),

        MongooseModule.forFeature([
            {
                name: User.name,
                schema: UserSchema,
            },
            {
                name: Settings.name,
                schema: SettingsSchema,
            },
            {
                name: BankAccountDetails.name,
                schema: BankAccountDetailsSchema,
            },
            {
                name: AddressDetails.name,
                schema: AddressDetailsSchema,
            }

        ])
    ],
    controllers: [UserController, SettingsController, BankAccountDetailsController, AddressDetailsController],
    providers: [UserService, SettingsService, BankAccountDetailsService, AddressDetailsService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class UserModule {

}
