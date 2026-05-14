"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GymBuddyModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const user_module_1 = require("../user/user.module");
const gym_item_schema_1 = require("./schemas/gym-item.schema");
const gym_session_schema_1 = require("./schemas/gym-session.schema");
const gym_item_controller_1 = require("./controllers/gym-item/gym-item.controller");
const gym_item_service_1 = require("./services/gym-item/gym-item.service");
const gym_session_controller_1 = require("./controllers/gym-session/gym-session.controller");
const gym_session_service_1 = require("./services/gym-session/gym-session.service");
let GymBuddyModule = class GymBuddyModule {
};
exports.GymBuddyModule = GymBuddyModule;
exports.GymBuddyModule = GymBuddyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            jwt_1.JwtModule.registerAsync({
                inject: [config_1.ConfigService],
                useFactory: (config) => {
                    return {
                        secret: config.get('JWT_SECRET'),
                        signOptions: {
                            expiresIn: config.get('JWT_EXPIRES_IN'),
                        }
                    };
                }
            }),
            mongoose_1.MongooseModule.forFeature([
                {
                    name: gym_item_schema_1.GymItem.name,
                    schema: gym_item_schema_1.GymItemSchema,
                },
                {
                    name: gym_session_schema_1.GymSession.name,
                    schema: gym_session_schema_1.GymSessionSchema,
                }
            ])
        ],
        controllers: [gym_item_controller_1.GymItemController, gym_session_controller_1.GymSessionController],
        providers: [gym_item_service_1.GymItemService, gym_session_service_1.GymSessionService],
        exports: [passport_1.PassportModule, mongoose_1.MongooseModule],
    })
], GymBuddyModule);
//# sourceMappingURL=gym-buddy.module.js.map