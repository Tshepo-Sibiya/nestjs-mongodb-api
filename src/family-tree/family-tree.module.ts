import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from 'src/user/strategy/jwt.strategy';
import { FamilyMemberDetails, FamilyMemberDetailsSchema } from './schemas/family-member.schema';
import { RelationshipDetails, RelationshipDetailsSchema } from './schemas/relationship.schema';
import { FamilyDetails, FamilyDetailsSchema } from './schemas/family.schema';
import { FamilyMemberController } from './controllers/family-member/family-member.controller';
import { FamilyMemberService } from './services/family-member/family-member.service';
import { FamilyController } from './controllers/family/family.controller';
import { RelationshipController } from './controllers/relationship/relationship.controller';
import { FamilyService } from './services/family/family.service';
import { RelationshipService } from './services/relationship/relationship.service';
import { UserModule } from 'src/user/user.module';



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
                name: FamilyMemberDetails.name,
                schema: FamilyMemberDetailsSchema,
            },
            {
                name: RelationshipDetails.name,
                schema: RelationshipDetailsSchema,
            },
            {
                name: FamilyDetails.name,
                schema: FamilyDetailsSchema,
            }


        ])
    ],
    controllers: [FamilyMemberController, FamilyController, RelationshipController],
    providers: [FamilyMemberService, FamilyService, RelationshipService],
    exports: [PassportModule, MongooseModule],
})
export class FamilyTreeModule { }
