import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type TaskDocument = Task & mongoose.Document;

@Schema()
export class Task {
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

export const TaskSchema = SchemaFactory.createForClass(Task);
