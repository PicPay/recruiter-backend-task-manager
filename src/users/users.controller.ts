import {
  Controller,
  Get,
  Res,
  HttpStatus,
  Post,
  Body,
  Put,
  NotFoundException,
  Delete,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  
  @Get()
  public async getAllUser(
    @Res() res: Response,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    const users = await this.usersService.findAll(paginationQuery);

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

  @Put('/:id')
  public async updateUser(
    @Res() res: Response,
    @Param('id') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.usersService.update(userId, updateUserDto);
      if (!user) {
        throw new NotFoundException('user does not exist!');
      }
      return res.status(HttpStatus.OK).json({
        message: 'user has been successfully updated',
        user,
      });
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        message: 'Error: User not updated!',
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
