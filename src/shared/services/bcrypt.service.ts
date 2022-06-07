import { Injectable } from '@nestjs/common';
import { compareSync, hashSync, genSaltSync } from 'bcrypt';

@Injectable()
export class BcryptService {
  salt: string = genSaltSync(10);

  encrypt(password: string): string {
    return hashSync(password, this.salt);
  }

  compare(password: string, passwordD: string): boolean {
    return compareSync(password, passwordD);
  }
}
