import axios from 'axios';
import { Test } from '@nestjs/testing';
import { CarsService } from './cars.service';
import { ConfigModule } from '@nestjs/config';
import CarsRepository from './cars.repository';

const mockCarsRepository = () => ({
  createNewCar: jest.fn(),
});

describe('Car Service', () => {
  let carService: CarsService;
  let carsRepository;
  let testToken;

  beforeEach(async () => {
    const carModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
      providers: [
        CarsService,
        {
          provide: CarsRepository,
          useFactory: mockCarsRepository,
        },
      ],
    }).compile();

    carService = await carModule.get<CarsService>(CarsService);
    carsRepository = await carModule.get<CarsRepository>(CarsRepository);
    testToken = carService.getEnv('TEST_TOKEN');
  });

  describe('get one or more cars', () => {
    it('Should get car using lot number', async done => {
      let testLotNumber = 'NG-27114';
      const car = await carService.getOneOrMoreCars(testToken, testLotNumber);
      expect(car.length).toBe(1);
      expect(car[0].internalId).toEqual(testLotNumber);
      done();
    });

    it('should get car using vin', async done => {
      let testVin = 'D5CEC1027063B70C83';
      let car = await carService.getOneOrMoreCars(testToken, null, testVin);
      expect(car.length).toBeGreaterThanOrEqual(1);
      expect(car[0].vin).toEqual(testVin);
      done();
    });

    it('should fetch all cars for a give page', async done => {
      const randomPage = Math.floor(Math.random() * 200 + 1);
      let cars = await carService.getOneOrMoreCars(
        testToken,
        null,
        null,
        randomPage,
      );
      expect(cars.length).toBeGreaterThanOrEqual(1);
      done();
    });
  });

  describe('create new cars', () => {
    const mockNewCar = {
      carId: '34b5d040-a274-49d3-91aa-63e5de96e048',
      sku: 'honda/accord/2003/automatic',
      vin: 'D5CEC1027063B70C83',
      lotNumber: 'NG-27114',
    };

    it('Should create new car for valid entry', async () => {
      const mockedCreatedCar = {
        ...mockNewCar,
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      carsRepository.createNewCar.mockResolvedValue(mockedCreatedCar);
      expect(carsRepository.createNewCar).not.toHaveBeenCalled();
      const result = await carService.saveCar(mockNewCar);
      expect(carsRepository.createNewCar).toHaveBeenCalledWith(mockNewCar);
      expect(result).toEqual(mockedCreatedCar);
    });
  });
});
