import { Repository, Entity, EntityRepository } from 'typeorm';
import Car from './cars.entity';
import { CreateCarDto } from './dto/create-car.dto';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(Car)
export default class CarsRepository extends Repository<Car> {
  async createNewCar(createCarDto: CreateCarDto): Promise<Car> {
    const car = this.create();
    car.carId = createCarDto.carId;
    car.sku = createCarDto.sku;
    car.lotNumber = createCarDto.lotNumber;
    car.vin = createCarDto.vin;

    try {
      return await car.save();
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException(
          `car with id ${createCarDto.carId} already exist`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
