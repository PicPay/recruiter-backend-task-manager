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
import { UpdateTaskDTO } from './dto/CreateTaskDTO';
import { TaskService } from './task.service';

@Controller('taks')
@UseGuards(JwtAuthGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Req() req: any) {
    return this.taskService.create(req.user, req.body);
  }

  @Get()
  findAll(@Req() req: any) {
    return this.taskService.getAll(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.taskService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDTO: UpdateTaskDTO) {
    return this.taskService.update(id, updateTaskDTO);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.taskService.delete(id);
  }
}
