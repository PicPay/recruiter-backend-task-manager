import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  getAll(username: string) {
    return this.taskModel.find({ username }).exec();
  }

  getById(id: string) {
    return this.taskModel.findById(id).exec();
  }

  async create(username: string, task: Task) {
    return this.taskModel.create({
      username,
      ...task,
    });
  }

  async remove(id: string) {
    try {
      const exist = await this.taskModel.findById(id);

      if (exist) {
        return this.taskModel.findByIdAndDelete(id);
      }

      throw new BadRequestException('task does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: any, task: Partial<Task>) {
    try {
      const exist = await this.taskModel.findById(id);

      if (exist) {
        return this.taskModel
          .findByIdAndUpdate(id, { $set: task }, { new: true })
          .exec();
      }

      throw new BadRequestException('task does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
