import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCarDto,UpdateCarDto } from './dto';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {
  private cars = [
    // {
    //   id: uuid(),
    //   brand: 'Toyota',
    //   model: 'Corolla',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Honda',
    //   model: 'Civic',
    // },
    // {
    //   id: uuid(),
    //   brand: 'Jeep',
    //   model: 'Cherokee',
    // },
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

  update( id: string, updateCarDto: UpdateCarDto ){

    const { brand, model } = updateCarDto

    let updateCar = this.findOneById( id )
  
    if (brand !== undefined) {
      updateCar.brand = brand;
    }
  
    if (model !== undefined) {
      updateCar.model = model;
    }
  
    return updateCar;
  }

  delete(id: string){

    const car = this.findOneById(id)

    this.cars = this.cars.filter(car => car.id !== id )

    return {
      message: `Car with id ${id} has been deleted`,  
      deletedCar: car,
    };
  }

  fillCarsWithSeedData ( cars: Car[] ){
    this.cars = cars
  }


}
