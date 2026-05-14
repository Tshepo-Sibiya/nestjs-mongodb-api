"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoicingModule = void 0;
const common_1 = require("@nestjs/common");
const invoice_controller_1 = require("./controllers/invoice/invoice.controller");
const invoice_item_controller_1 = require("./controllers/invoice-item/invoice-item.controller");
const quote_controller_1 = require("./controllers/quote/quote.controller");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const passport_1 = require("@nestjs/passport");
const invoice_schema_1 = require("./schemas/invoice.schema");
const invoice_item_schema_1 = require("./schemas/invoice-item.schema");
const quote_service_1 = require("./services/quote/quote.service");
const quote_schema_1 = require("./schemas/quote.schema");
const user_module_1 = require("../user/user.module");
const invoice_item_service_1 = require("./services/invoice-item/invoice-item.service");
const customer_schema_1 = require("./schemas/customer.schema");
const customer_controller_1 = require("./controllers/customer/customer.controller");
const customer_service_1 = require("./services/customer/customer.service");
const vat_rate_controller_1 = require("./controllers/vat-rate/vat-rate.controller");
const vat_rate_service_1 = require("./services/vat/vat-rate.service");
const vat_schema_1 = require("./schemas/vat.schema");
const invoice_service_1 = require("./services/invoice/invoice.service");
const user_service_1 = require("../user/services/user/user.service");
const invoice_settings_schema_1 = require("./schemas/invoice-settings.schema");
const invoice_settings_controller_1 = require("./controllers/invoice-settings/invoice-settings.controller");
const invoice_settings_service_1 = require("./services/invoice-settings/invoice-settings.service");
const customer_address_schema_1 = require("./schemas/customer-address.schema");
let InvoicingModule = class InvoicingModule {
};
exports.InvoicingModule = InvoicingModule;
exports.InvoicingModule = InvoicingModule = __decorate([
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
                    name: invoice_schema_1.Invoice.name,
                    schema: invoice_schema_1.InvoiceSchema,
                },
                {
                    name: invoice_item_schema_1.InvoiceItem.name,
                    schema: invoice_item_schema_1.InvoiceItemSchema,
                },
                {
                    name: invoice_settings_schema_1.InvoiceSettings.name,
                    schema: invoice_settings_schema_1.InvoiceSettingsSchema,
                },
                {
                    name: quote_schema_1.Quote.name,
                    schema: quote_schema_1.QuoteSchema,
                },
                {
                    name: customer_schema_1.Customer.name,
                    schema: customer_schema_1.CustomerSchema,
                },
                {
                    name: customer_address_schema_1.InvoiceCustomerAddress.name,
                    schema: customer_address_schema_1.InvoiceCustomerAddressSchema,
                },
                {
                    name: vat_schema_1.VatRate.name,
                    schema: vat_schema_1.VatRateSchema,
                },
            ])
        ],
        controllers: [invoice_controller_1.InvoiceController, vat_rate_controller_1.VatRateController, invoice_item_controller_1.InvoiceItemController, quote_controller_1.QuoteController, customer_controller_1.CustomerController, invoice_settings_controller_1.InvoiceSettingsController],
        providers: [quote_service_1.QuoteService, invoice_service_1.InvoiceService, vat_rate_service_1.VatRateService, invoice_item_service_1.InvoiceItemService, customer_service_1.CustomerService, user_service_1.UserService, invoice_settings_service_1.InvoiceSettingsService],
        exports: [passport_1.PassportModule, mongoose_1.MongooseModule],
    })
], InvoicingModule);
//# sourceMappingURL=invoicing.module.js.map