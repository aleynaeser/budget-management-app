import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { IRevenueCategory } from '../interfaces';

export default function useRevenueCategorySchema(revenueCategory?: IRevenueCategory) {
  const revenueCategorySchema = Yup.object({
    name: Yup.string().required('Category Name is required.'),
  });

  const revenueCategorySchemaInitialValues = revenueCategory
    ? { ...revenueCategory }
    : { id: uuidv4(), name: '', colorHexCode: '#3e3e3e' };

  return { revenueCategorySchema, revenueCategorySchemaInitialValues };
}
