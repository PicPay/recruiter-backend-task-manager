import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Task } from './task.entity';

@Schema()
export class TaskSchema extends Document implements Task {
  @ApiProperty()
  @Prop()
  name: string;

  @ApiProperty()
  @Prop()
  username: string;

  @ApiProperty()
  @Prop()
  title: string;

  @ApiProperty()
  @Prop()
  value: number;

  @ApiProperty()
  @Prop()
  date: Date;

  @ApiProperty()
  @Prop()
  image: string;

  @ApiProperty()
  @Prop()
  isPaid: boolean;
}
