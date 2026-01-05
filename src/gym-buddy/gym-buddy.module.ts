import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { GymItem, GymItemSchema } from './schemas/gym-item.schema';
import { GymSession, GymSessionSchema } from './schemas/gym-session.schema';

@Module({
    imports: [
        UserModule,
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
                name: GymItem.name,
                schema: GymItemSchema,
            },
            {
                name: GymSession.name,
                schema: GymSessionSchema,
            }

        ])
    ],
    controllers: [],
    providers: [],
    exports: [PassportModule, MongooseModule],
})
export class GymBuddyModule {}
