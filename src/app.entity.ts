import { ApiProperty } from '@nestjs/swagger';

export class Task {
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  value: number;

  @ApiProperty()
  date: Date;

  @ApiProperty()
  image: string;

  @ApiProperty()
  isPaid: boolean;
}
