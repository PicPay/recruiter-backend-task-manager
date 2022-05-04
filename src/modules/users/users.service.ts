import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.shema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private bcryptService: BcryptService,
  ) {}

  async getAll() {
    return await this.userModel.find().exec();
  }

  async getById(id: string) {
    return await this.userModel.findById(id).exec();
  }

  async getByEmail(email: string) {
    return await this.userModel.findOne({ email }).exec();
  }

  async create(user: CreateUserDto) {
    const userExist = await this.getByEmail(user.email);

    if (userExist) {
      throw new BadRequestException('already registered user');
    }

    return await this.userModel.create({
      username: user.username,
      email: user.email,
      password: await this.bcryptService.encrypt(user.password),
    });
  }

  async findByIdAndUpdate(id: any, user: UpdateUserDto) {
    try {
      const exist = await this.userModel.findById(id);
      if (exist) {
        return await this.userModel
          .findByIdAndUpdate(id, { $set: user }, { new: true })
          .exec();
      }
      throw new BadRequestException('user does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
