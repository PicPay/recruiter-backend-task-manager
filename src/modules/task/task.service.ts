import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';
import { Task } from './schemas/task.schema';
import { CreateTaskDTO } from './dto/UpdateTaskDTO';
import { UpdateTaskDTO } from './dto/CreateTaskDTO';
import { User } from '../users/schemas/user.shema';

@Injectable()
export class TaskService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAll(user: User) {
    return await this.taskModel.find({ username: user.username }).exec();
  }

  async getById(id: string) {
    return await this.taskModel.findById(id).exec();
  }
  async create(user: User, task: CreateTaskDTO) {
    const username = user.username;
    this.taskModel.create({
      username,
      ...task,
    });
  }

  async delete(id: string) {
    try {
      const exist = await this.taskModel.findById(id);
      if (exist) {
        return await this.taskModel.findByIdAndDelete(id);
      }
      throw new BadRequestException('task does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async update(id: any, task: UpdateTaskDTO) {
    try {
      const exist = await this.taskModel.findById(id);
      if (exist) {
        return await this.taskModel
          .findByIdAndUpdate(id, { $set: task }, { new: true })
          .exec();
      }
      throw new BadRequestException('task does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
