import { MaxLength, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  readonly username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(60)
  readonly password: string;
}
