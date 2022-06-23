import { Document } from 'mongoose';

export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  readonly password: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly bio: string;
  readonly avatar: string;
}
