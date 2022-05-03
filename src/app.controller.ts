import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Task } from './app.entity';
import { Response } from 'express';

import { AppService } from './app.service';

@ApiBearerAuth()
@ApiTags('task')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('task/:id')
  @ApiResponse({ status: 404 })
  get(@Res() res: Response, @Param('id') id: number) {
    try {
      const task = this.appService.findOne(id);
      if (!task) {
        return res.status(HttpStatus.NOT_FOUND).send();
      }
      return task;
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }

  @Get('task')
  list(): Task[] {
    return this.appService.listAll();
  }

  @Post('task')
  save(@Body() task: Task) {
    return this.appService.create(task);
  }

  @Patch('task')
  update(@Param('id') id: number, @Body() task: Task) {
    return this.appService.update(id, task);
  }

  @Delete('task/:id')
  destroy(@Param('id') id: number) {
    return this.appService.destroy(id);
    //
  }
}
