import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCarDto } from './dto/create-carDto.dto';
import { v4 as uuid } from 'uuid';

@Injectable()
export class CarsService {
  private cars = [
    {
      id: uuid(),
      brand: 'Toyota',
      model: 'Corolla',
    },
    {
      id: uuid(),
      brand: 'Honda',
      model: 'Civic',
    },
    {
      id: uuid(),
      brand: 'Jeep',
      model: 'Cherokee',
    },
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id '${id}' not found`);

    return car;
  }

  create(createCarDto: CreateCarDto) {
    const { brand, model } = createCarDto;

    const car = this.cars.find(
      (car) => car.brand === brand && car.model === model,
    );

    if (car) throw new NotFoundException('this car already exists');

    const newcar = {
      id: uuid(),
      brand,
      model,
    };

    this.cars.push(newcar);

    return newcar;
  }
}
