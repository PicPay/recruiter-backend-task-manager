import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Task } from './task.entity';
import { TaskService } from './task.service';

@Controller('tasks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post(':username')
  create(@Param('username') username: string, @Body() task: Task) {
    return this.taskService.create(username, task);
  }

  @Get()
  findAll(@Param('username') username: string) {
    return this.taskService.getAll(username);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() task: Partial<Task>) {
    return this.taskService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.taskService.remove(id);
  }
}
