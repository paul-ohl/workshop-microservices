import { Controller, Get, Post, Body } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';
import { CreateAnimalDto } from './dto/create-animal.dto';

@Controller('animals')
export class AppController {
  private client: ClientProxy;

  constructor() {
    // Création du client pour communiquer avec le microservice via TCP
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'micro-service', 
        port: 3001,            
      },
    });
  }

  @Get()
  async getAnimals() {
    // obtenir tous les animaux
    return this.client.send({ cmd: 'get_animals' }, {});
  }

  @Post()
  async createAnimal(@Body() createAnimalDto: CreateAnimalDto) {
    // créer un nouvel animal
    return this.client.send({ cmd: 'create_animal' }, createAnimalDto);
  }
}
