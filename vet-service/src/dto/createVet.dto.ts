import { Disponibility } from '@prisma/client';

export class createVetDto {
  name: string;
  price: string;
  categoryIds: string[];
  disponibility: Disponibility[];
}
