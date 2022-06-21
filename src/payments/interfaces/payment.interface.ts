import { Document } from 'mongoose';

export interface IPayment extends Document {
  readonly username: string;
  readonly firstName: string;
  readonly lastName: string;
  readonly title: string;
  readonly value: number;
  readonly date: Date;
  readonly isPaid?: boolean;
}
