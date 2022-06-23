import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  NotFoundException,
  Delete,
  Param,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto';
import { ApiTags, ApiExcludeController } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
@ApiExcludeController()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public async getAllUser(@Res() res: Response) {
    const users = await this.usersService.findAll();

    return res.status(HttpStatus.OK).json(users);
  }

  @Get('/:id')
  public async getUser(@Res() res: Response, @Param('id') userId: string) {
    if (!userId) {
      throw new NotFoundException('user does not exist!');
    }

    const user = await this.usersService.findOne(userId);
    return res.status(HttpStatus.OK).json(user);
  }

  @Post()
  public async addUser(
    @Res() res: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      const user = await this.usersService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json({
        message: 'user has been created successfully',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not created!',
        status: 400,
      });
    }
  }

  @Delete('/:id')
  public async deleteUser(@Res() res: Response, @Param('id') userId: string) {
    if (!userId) {
      throw new NotFoundException('user ID does not exist');
    }

    const user = await this.usersService.remove(userId);

    return res.status(HttpStatus.OK).json({
      message: 'user has been deleted',
      user,
    });
  }
}
