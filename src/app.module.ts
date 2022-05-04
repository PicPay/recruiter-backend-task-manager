import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TaskModule } from './modules/task/task.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TaskModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://localhost/nest'),
  ],
  controllers: [AppController],
})
export class AppModule {}
