import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsOptional,
  IsBoolean,
  IsDateString,
  IsNumber,
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

  @IsNumber()
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
