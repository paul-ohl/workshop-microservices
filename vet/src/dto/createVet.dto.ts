import { Disponibility } from '@prisma/client';

export class createVetDto {
  name: string;
  price: number;
  categoryIds: string[];
  disponibility: Disponibility[];
}
