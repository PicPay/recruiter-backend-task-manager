import {
  MaxLength,
  IsNotEmpty,
  IsString,
  IsEmail,
  IsBase64,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @MaxLength(50)
  readonly password: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly firstName: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly lastName: string;

  @IsString()
  @MaxLength(500)
  readonly bio: string;

  @IsBase64()
  readonly avatar: string;
}
