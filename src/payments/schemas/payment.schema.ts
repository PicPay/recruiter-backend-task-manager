import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Payment extends Document {
  @Prop()
  username: string;

  @Prop()
  firstName: string;

  @Prop({ unique: true })
  lastName: string;

  @Prop()
  title: string;

  @Prop()
  value: number;

  @Prop()
  date: Date;

  @Prop()
  isPaid?: boolean;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
