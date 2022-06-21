import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDecimal,
  IsDate,
  IsBoolean,
} from 'class-validator';

export class CreatePaymentDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly title: string;

  @IsDecimal()
  @IsNotEmpty()
  readonly value: number;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsBoolean()
  @IsOptional()
  readonly isPaid: boolean;
}
