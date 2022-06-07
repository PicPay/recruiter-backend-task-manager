import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { BcryptService } from 'src/shared';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcryptService: BcryptService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    const isSamePassword = this.bcryptService.compare(password, user.password);
    if (user && isSamePassword) {
      return user;
    }

    return null;
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
