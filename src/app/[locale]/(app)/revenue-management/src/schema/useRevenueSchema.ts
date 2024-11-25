import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { BMConfig } from '@common/config';
import { IRevenue, IRevenueCategory } from '../interfaces';
import { priceValidationSchema } from '@common/schemas';
import useRevenueCategorySchema from './useRevenueCategorySchema';

export default function useRevenueSchema(revenue?: IRevenue) {
  const { revenueCategorySchema } = useRevenueCategorySchema();

  const revenueSchema: Yup.ObjectSchema<IRevenue> = Yup.object({
    id: Yup.string().required('ID is required.'),
    name: Yup.string().required('Revenue Name is required.'),
    description: Yup.string(),
    price: priceValidationSchema(),
    date: Yup.string().required('Date is required.'),
    category: revenueCategorySchema,
  });

  const revenueSchemaInitialValues: IRevenue = revenue
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
