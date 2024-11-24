import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { IRevenue, IRevenueCategory } from '../interfaces';
import { priceValidationSchema } from '@common/schemas';
import { BMConfig } from '@common/config';

export default function useRevenueSchema(revenue?: IRevenue) {
  const revenueSchema = Yup.object({
    name: Yup.string().required('Revenue Name is required.'),
    description: Yup.string(),
    price: priceValidationSchema(),
    date: Yup.string().required('Date is required.'),
    category: Yup.object().shape({
      id: Yup.string().required('Category is required.'),
    }),
  });

  const revenueSchemaInitialValues = revenue
    ? { ...revenue }
    : {
        id: uuidv4(),
        name: '',
        date: '',
        description: '',
        category: undefined as unknown as IRevenueCategory,
        price: {
          amount: 0,
          currency: BMConfig.defaultCurrency,
        },
      };

  return { revenueSchema, revenueSchemaInitialValues };
}
