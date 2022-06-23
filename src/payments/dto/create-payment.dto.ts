import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsDecimal,
  IsBoolean,
  IsDateString,
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

  @IsDateString()
  @IsNotEmpty()
  readonly date: string;

  @IsOptional()
  readonly image?: string;

  @IsBoolean()
  @IsOptional()
  readonly isPayed?: boolean;
}
