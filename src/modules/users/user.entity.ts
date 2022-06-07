import { IsEmail, IsString } from 'class-validator';

export class User {
  @IsString()
  readonly username: string;
  @IsString()
  readonly password: string;
  @IsEmail()
  readonly email: string;
}
