import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { BMConfig } from '@common/config';
import { IExpenseCategory } from '../interfaces';
import { priceValidationSchema } from '@common/schemas';

export default function useExpenseCategorySchema(expenseCategory?: IExpenseCategory) {
  const expenseCategorySchema: Yup.ObjectSchema<IExpenseCategory> = Yup.object({
    id: Yup.string().required('ID is required.'),
    name: Yup.string().required('Category Name is required.'),
    colorHexCode: Yup.string().required('Color Hex Code is required.'),
    maxThreshold: priceValidationSchema('Max Threshold'),
  });

  const expenseCategorySchemaInitialValues: IExpenseCategory = expenseCategory
    ? { ...expenseCategory }
    : { id: uuidv4(), name: '', colorHexCode: '#3e3e3e', maxThreshold: { currency: BMConfig.defaultCurrency, amount: 0 } };

  return { expenseCategorySchema, expenseCategorySchemaInitialValues };
}
