import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { IRevenueCategory } from '../interfaces';

export default function useRevenueCategorySchema(revenueCategory?: IRevenueCategory) {
  const revenueCategorySchema: Yup.ObjectSchema<IRevenueCategory> = Yup.object({
    id: Yup.string().required('ID is required.'),
    name: Yup.string().required('Category Name is required.'),
    colorHexCode: Yup.string().required('Color Hex Code is required.'),
  });

  const revenueCategorySchemaInitialValues: IRevenueCategory = revenueCategory
    ? { ...revenueCategory }
    : { id: uuidv4(), name: '', colorHexCode: '#3e3e3e' };

  return { revenueCategorySchema, revenueCategorySchemaInitialValues };
}
