export interface Car {
  id: string;
  createdAt: string;
  internalId: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  color?: string;
  vin: string;
  inspection: {
    id: string;
  };
  location?: [
    {
      location: string;
    },
  ];
}
