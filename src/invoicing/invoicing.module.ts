import { Module } from '@nestjs/common';
import { InvoiceController } from './controllers/invoice/invoice.controller';
import { InvoiceItemController } from './controllers/invoice-item/invoice-item.controller';
import { QuoteController } from './controllers/quote/quote.controller';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/user/strategy/jwt.strategy';
import { Invoice, InvoiceSchema } from './schemas/invoice.schema';
import { InvoiceItem, InvoiceItemSchema } from './schemas/invoice-item.schema';

import { QuoteService } from './services/quote/quote.service';
import { Quote, QuoteSchema } from './schemas/quote.schema';
import { UserModule } from 'src/user/user.module';
import { InvoiceItemService } from './services/invoice-item/invoice-item.service';
import { Customer, CustomerSchema } from './schemas/customer.schema';
import { CustomerController } from './controllers/customer/customer.controller';
import { CustomerService } from './services/customer/customer.service';
import { VatRateController } from './controllers/vat-rate/vat-rate.controller';
import { VatRateService } from './services/vat/vat-rate.service';
import { VatRate, VatRateSchema } from './schemas/vat.schema';
import { InvoiceService } from './services/invoice/invoice.service';
import { UserService } from 'src/user/services/user/user.service';

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
                name: Invoice.name,
                schema: InvoiceSchema,
            },
            {
                name: InvoiceItem.name,
                schema: InvoiceItemSchema,
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
                name: VatRate.name,
                schema: VatRateSchema,
            },

        ])
    ],
    controllers: [InvoiceController, VatRateController, InvoiceItemController, QuoteController, CustomerController],
    providers: [QuoteService, InvoiceService, VatRateService, InvoiceItemService, CustomerService, JwtStrategy, UserService],
    exports: [JwtStrategy, PassportModule, MongooseModule],
})
export class InvoicingModule {

}
