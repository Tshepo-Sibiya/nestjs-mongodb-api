import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice/invoice.controller';
import { InvoiceItemController } from './controllers/invoice-item/invoice-item.controller';
import { QuoteController } from './controllers/quote/quote.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/auth/strategy/jwt.strategy';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { InvoiceItem, InvoiceItemSchema } from './schemas/invoice-item.schema';
import { InvoiceSettings, InvoiceSettingsSchema } from './schemas/invoice-settings.schema';
import { QuoteService } from './services/quote/quote.service';
import { InvoiceService } from './services/invoice/invoice.service';
import { InvoiceSettingsService } from './services/invoice-settings/invoice-settings.service';
import { Quote, QuoteSchema } from './schemas/quote.schema';
import { AuthModule } from 'src/auth/auth.module';
import { InvoiceItemService } from './services/invoice-item/invoice-item.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { InvoiceAccountDetails, InvoiceAccountSchema } from './schemas/invoice-account-details.schema';
import { InvoiceSettingsController } from './controllers/invoice-settings/invoice-settings.controller';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';

@Module({
    imports: [
        AuthModule,
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
                name: Invoice.name,
                schema: InvoiceSchema,
            },
            {
                name: InvoiceItem.name,
                schema: InvoiceItemSchema,
            },
            {
                name: InvoiceSettings.name,
                schema: InvoiceSettingsSchema,
            },
            {
                name: Quote.name,
                schema: QuoteSchema,
            },
            {
                name: Customer.name,
                schema: CustomerSchema,
            },
            {
                name: InvoiceAccountDetails.name,
                schema: InvoiceAccountSchema,
            },

        ])
    ],
    controllers: [InvoiceController, InvoiceItemController, QuoteController, InvoiceSettingsController, CustomerController],
    providers: [QuoteService, InvoiceService, InvoiceItemService, CustomerService, InvoiceSettingsService, JwtStrategy],
    exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class InvoicingModule {

}
