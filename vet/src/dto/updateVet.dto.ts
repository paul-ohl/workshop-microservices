import { Disponibility } from '@prisma/client';

export class updateVetDto {
  name?: string;
  price?: string;
  categoryIds?: string[];
  Disponibility?: Disponibility[];
}
