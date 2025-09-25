import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';


import { ConfigModule } from '@nestjs/config';
import { InvoicingModule } from './invoicing/invoicing.module';
import { UserModule } from './user/user.module';
import { FamilyTreeModule } from './family-tree/family-tree.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/digitaltransitdb'),
    UserModule,
    InvoicingModule,
    FamilyTreeModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
