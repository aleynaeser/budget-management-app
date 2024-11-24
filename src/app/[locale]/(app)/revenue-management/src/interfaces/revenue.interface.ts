import { IPrice } from '@common/interfaces';
import { IRevenueCategory } from './revenue-category.interface';

export interface IRevenue {
  id: string;
  name: string;
  description?: string;
  category: IRevenueCategory;
  price: IPrice;
  date: string;
}
