import { Injectable } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
    @MessagePattern({ cmd: 'get_animals' })
    getAnimals() {
        // Logique pour retourner les animaux, par exemple en utilisant AnimalService
        return [
            { name: 'Rex', species: 'Dog', age: 3, gender: 1 },
            { name: 'Milo', species: 'Cat', age: 2, gender: 1 },
        ];
    }
}
