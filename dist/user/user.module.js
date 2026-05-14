"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("./schemas/user.schema");
const passport_1 = require("@nestjs/passport");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
const user_service_1 = require("./services/user/user.service");
const jwt_strategy_1 = require("./strategy/jwt.strategy");
const settings_service_1 = require("./services/settings/settings.service");
const settings_controller_1 = require("./controllers/settings/settings.controller");
const settings_schema_1 = require("./schemas/settings.schema");
const bank_account_details_schema_1 = require("./schemas/bank-account-details.schema");
const bank_account_details_service_1 = require("./services/bank-account-details/bank-account-details.service");
const bank_account_details_controller_1 = require("./controllers/bank-account-details/bank-account-details.controller");
const user_controller_1 = require("./controllers/user/user.controller");
const address_details_controller_1 = require("./controllers/address-details/address-details.controller");
const address_details_service_1 = require("./services/address-details/address-details.service");
const address_details_schema_1 = require("./schemas/address-details.schema");
const business_schema_1 = require("./schemas/business.schema");
const individual_schema_1 = require("./schemas/individual.schema");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [
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
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: settings_schema_1.Settings.name,
                    schema: settings_schema_1.SettingsSchema,
                },
                {
                    name: bank_account_details_schema_1.BankAccountDetails.name,
                    schema: bank_account_details_schema_1.BankAccountDetailsSchema,
                },
                {
                    name: address_details_schema_1.AddressDetails.name,
                    schema: address_details_schema_1.AddressDetailsSchema,
                },
                {
                    name: individual_schema_1.Individual.name,
                    schema: individual_schema_1.IndividualSchema
                },
                {
                    name: business_schema_1.Business.name,
                    schema: business_schema_1.BusinessSchema
                },
            ])
        ],
        controllers: [user_controller_1.UserController, settings_controller_1.SettingsController, bank_account_details_controller_1.BankAccountDetailsController, address_details_controller_1.AddressDetailsController],
        providers: [user_service_1.UserService, settings_service_1.SettingsService, bank_account_details_service_1.BankAccountDetailsService, address_details_service_1.AddressDetailsService, jwt_strategy_1.JwtStrategy],
        exports: [jwt_strategy_1.JwtStrategy, passport_1.PassportModule, mongoose_1.MongooseModule],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map