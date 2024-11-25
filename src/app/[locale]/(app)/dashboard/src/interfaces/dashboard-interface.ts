import { IPrice } from '@common/interfaces';

export interface ISliderItem {
  name: string;
  date: string;
  price: IPrice;
  type: 'expense' | 'revenue';
}

export interface IDashboardSummary {
  revenue: IDashboardSummaryItem;
  expense: IDashboardSummaryItem;
}

export interface IDashboardSummaryItem {
  title: string;
  totalLength: number;
  total: number;
  path: string;
}
