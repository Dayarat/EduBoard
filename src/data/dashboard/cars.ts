import { ICar } from 'types/types';
import car1 from 'assets/OIP.jpg';
import car2 from 'assets/OIP.jpg';
import car3 from 'assets/OIP.jpg';

const carImages: Record<number, string> = { 1: car1, 2: car2, 3: car3 };

export const cars: ICar[] = [
  {
    id: 1,
    imageUrl: carImages[1],
    recommendation: 64,
    modelName: 'ABC',
    mileage: 132,
    costPerHour: 32,
    backgroundColor: 'primary.lighter',
  },
  {
    id: 2,
    recommendation: 74,
    imageUrl: carImages[2],
    modelName: 'DEF',
    mileage: 130,
    costPerHour: 28,
    backgroundColor: 'warning.lighter',
  },
  {
    id: 3,
    recommendation: 74,
    imageUrl: carImages[3],
    modelName: 'GHI',
    mileage: 130,
    costPerHour: 28,
    backgroundColor: 'error.lighter',
  },
];
