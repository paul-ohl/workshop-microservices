import { IsNotEmpty } from 'class-validator';
import { PayItem } from './payItem';
import { ApiProperty } from '@nestjs/swagger';

export class PayCart {
  @ApiProperty()
  @IsNotEmpty()
  id: number;

  @ApiProperty()
  @IsNotEmpty()
  ownerId: string;

  @ApiProperty({
    type: [PayItem],
  })
  @IsNotEmpty()
  items: PayItem[];
}
