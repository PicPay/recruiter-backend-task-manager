import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto, UpdateUserDto } from './dto';
import { User } from './schemas/user.schema';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  public async findAll(paginationQuery: PaginationQueryDto): Promise<{
    count: number;
    items: User[];
  }> {
    const { limit, offset } = paginationQuery;
    const count = await this.userModel.find().countDocuments();

    return {
      count,
      items: await this.userModel
        .find()
        .skip(offset - 1)
        .limit(limit)
        .exec(),
    };
  }

  public async findOneByUsername(username: string): Promise<User> {
    const user = await this.userModel.findOne({ username });
    return user;
  }

  public async findOne(userId: string): Promise<User> {
    const user = await this.userModel.findById({ _id: userId }).exec();

    if (!user) {
      throw new NotFoundException(`User #${userId} not found`);
    }

    return user;
  }

  public async create(createUserDto: CreateUserDto): Promise<IUser> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto,
  ): Promise<IUser> {
    const existingUser = await this.userModel.findByIdAndUpdate(
      { _id: userId },
      updateUserDto,
      { new: true },
    );

    if (!existingUser) {
      throw new NotFoundException(`User #${userId} not found`);
    }
    return existingUser;
  }

  public async remove(userId: string): Promise<any> {
    const user = await this.userModel.findByIdAndRemove(userId);
    return user;
  }
}
