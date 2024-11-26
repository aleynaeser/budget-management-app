import { IPrice } from '@common/interfaces';

export interface ISliderItem {
  name: string;
  date: string;
  price: IPrice;
  type: 'expense' | 'revenue';
}

export interface IBudgetSummary {
  revenue: IBudgetSummaryItem;
  expense: IBudgetSummaryItem;
}

export interface IBudgetSummaryItem {
  label: string;
  totalLength: number;
  value: number;
  path: string;
  color: string;
}
