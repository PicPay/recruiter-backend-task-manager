import { Module } from '@nestjs/common';
import { MongooseModule, SchemaFactory } from '@nestjs/mongoose';
import { TaskSchema } from './task.schema';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Task', schema: SchemaFactory.createForClass(TaskSchema) },
    ]),
  ],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
