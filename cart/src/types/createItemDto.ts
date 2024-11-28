import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateItemDto {
  @IsNotEmpty()
  @ApiProperty()
  price: number;

  @IsInt()
  @ApiProperty()
  quantity: number;
}
