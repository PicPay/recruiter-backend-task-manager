import { Prop, Schema } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';
import { User } from './user.entity';

@Schema()
export class UserSchema extends Document implements User {
  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  email: string;

  @ApiProperty()
  @Prop()
  password: string;
}
