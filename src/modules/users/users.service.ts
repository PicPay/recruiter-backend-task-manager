import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Model } from 'mongoose';
import { BcryptService } from 'src/shared/services/bcrypt.service';
import {
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common/exceptions';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly bcryptService: BcryptService,
  ) {}

  getAll() {
    return this.userModel.find().exec();
  }

  getById(id: string) {
    return this.userModel.findById(id).exec();
  }

  getByEmail(email: string) {
    return this.userModel.findOne({ email }).exec();
  }

  async create(user: User) {
    const userExist = await this.getByEmail(user.email);

    if (userExist) {
      throw new BadRequestException('already registered user');
    }

    return this.userModel.create({
      ...user,
      password: this.bcryptService.encrypt(user.password),
    });
  }

  async update(id: string, user: Partial<User>) {
    try {
      const exist = await this.userModel.findById(id);

      if (exist) {
        return this.userModel
          .findByIdAndUpdate(id, { $set: user }, { new: true })
          .exec();
      }

      throw new BadRequestException('user does not exist');
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
