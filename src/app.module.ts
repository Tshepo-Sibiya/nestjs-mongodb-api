import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './Users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/database'),
    UsersModule
  ],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
