import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  salt: string | number = bcrypt.genSaltSync(10);

  async encrypt(password) {
    return await bcrypt.hashSync(password, this.salt);
  }
  async compare(password, passwordD) {
    return await bcrypt.compare(password, passwordD);
  }
}
