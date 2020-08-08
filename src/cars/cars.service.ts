import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { queryOneOrAll } from './queries';
import { Car } from './interfaces/car.interface';
import { CreateCarDto } from './dto/create-car.dto';
import CarEntity from './cars.entity';
import { InjectRepository } from '@nestjs/typeorm';
import CarsRepository from './cars.repository';

@Injectable()
export class CarsService {
  constructor(
    @InjectRepository(CarsRepository)
    private carsRepository: CarsRepository,
    private configService: ConfigService,
  ) {}

  getEnv(key: string): string {
    return this.configService.get<string>(key);
  }

  get carUrl(): string {
    const baseUrl = this.configService.get<string>('FCG_BASE_HREF');
    return `${baseUrl}car/`;
  }

  async getOneOrMoreCars(
    token: string,
    lotNumber?: string,
    vin?: string,
    page?: number,
  ): Promise<Car[] | null> {
    try {
      const carQueryResponse = await axios.post(
        this.carUrl,
        queryOneOrAll(lotNumber, vin, page),
        {
          headers: {
            'Content-Type': 'application/graphql',
            Authorization: `Bearer ${token}`,
          },
        },
      );
      return carQueryResponse.data?.data?.car?.list ?? null;
    } catch (error) {
      console.error(error);
    }
  }

  async saveCar(createCarDto: CreateCarDto): Promise<CarEntity> {
    return this.carsRepository.createNewCar(createCarDto);
  }
}
