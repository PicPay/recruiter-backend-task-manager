import {
  IsString,
  IsDate,
  IsBoolean,
  IsDecimal,
  IsBase64,
} from 'class-validator';

export class Task {
  @IsString()
  readonly username: string;
  @IsString()
  readonly name: string;
  @IsString()
  readonly title: string;
  @IsDecimal()
  readonly value: number;
  @IsDate()
  readonly date: Date;
  @IsBase64()
  readonly image: string;
  @IsBoolean()
  readonly isPaid: boolean;
}
