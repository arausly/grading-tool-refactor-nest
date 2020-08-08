import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCarDto {
  @IsNotEmpty()
  @IsString()
  carId: string;

  @IsNotEmpty()
  @IsString()
  sku: string;

  @IsNotEmpty()
  @IsString()
  lotNumber: string;

  @IsNotEmpty()
  @IsString()
  vin: string;
}
