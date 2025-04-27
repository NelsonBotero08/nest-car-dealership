import { Injectable } from '@nestjs/common';
import { CarsService } from 'src/cars/cars.service';
import { CARS_SEED } from './data/cars.seed';
import { BrandsService } from '../brands/brands.service';
import { BRANDS_SEED } from './data/brands.seed';


@Injectable()
export class SeedService {

  constructor(
    private readonly carsService: CarsService,
    private readonly brandsService: BrandsService
  ){}

  popularDb() {
    this.carsService.fillCarsWithSeedData(CARS_SEED);
    this.brandsService.fillBrandWithSeedData(BRANDS_SEED);
    return 'executed'
  }

}
