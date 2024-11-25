import { CURRENCY } from '@common/enums';
import { ISliderItem } from '../interfaces';

export const initialSliderData: ISliderItem[] = [
  {
    name: 'Monthly Salary',
    date: new Date().toISOString(),
    price: {
      amount: 5000,
      currency: CURRENCY.EUR,
    },
    type: 'revenue',
  },
  {
    name: 'Rent Payment',
    date: new Date(Date.now() - 86400000).toISOString(),
    price: {
      amount: 1200,
      currency: CURRENCY.USD,
    },
    type: 'expense',
  },
  {
    name: 'Freelance Project',
    date: new Date(Date.now() - 172800000).toISOString(),
    price: {
      amount: 850,
      currency: CURRENCY.EUR,
    },
    type: 'revenue',
  },
  {
    name: 'Grocery Shopping',
    date: new Date(Date.now() - 259200000).toISOString(),
    price: {
      amount: 175,
      currency: CURRENCY.TRY,
    },
    type: 'expense',
  },
  {
    name: 'Consulting Fee',
    date: new Date(Date.now() - 345600000).toISOString(),
    price: {
      amount: 1500,
      currency: CURRENCY.EUR,
    },
    type: 'revenue',
  },
];
