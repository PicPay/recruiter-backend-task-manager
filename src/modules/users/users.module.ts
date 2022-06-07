import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { UserSchema } from './user.schema';
import { BcryptService } from 'src/shared/services/bcrypt.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'User', schema: SchemaFactory.createForClass(UserSchema) },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService, BcryptService],
  exports: [UsersService],
})
export class UsersModule {}
