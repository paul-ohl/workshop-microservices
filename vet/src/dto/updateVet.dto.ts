import { Disponibility } from '@prisma/client';

export class updateVetDto {
  name?: string;
  price?: number;
  categoryIds?: string[];
  Disponibility?: Disponibility[];
}
