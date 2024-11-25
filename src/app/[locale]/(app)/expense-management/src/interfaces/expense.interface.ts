import { IPrice } from '@common/interfaces';
import { IExpenseCategory } from './expense-category.interface';

export interface IExpense {
  id: string;
  name: string;
  description?: string;
  category: IExpenseCategory;
  price: IPrice;
  date: string;
}
