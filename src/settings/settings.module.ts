import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { SettingsService } from './services/settings/settings.service';
import { SettingsSchema } from './schemas/settings.schema';
import { SettingsController } from './controllers/settings/settings.controller';


@Module({
    imports: [
      AuthModule,
      MongooseModule.forFeature([{ name: 'Settings', schema: SettingsSchema }]),
    ],
    controllers: [SettingsController],
    providers: [SettingsService],
  })
export class SettingsModule {

}
