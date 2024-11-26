import { IsNotEmpty } from 'class-validator';
import { ItemDto } from './item.dto';
import { ApiProperty } from '@nestjs/swagger';

export class PayCartDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    type: [ItemDto],
  })
  @IsNotEmpty()
  items: ItemDto[];
}
