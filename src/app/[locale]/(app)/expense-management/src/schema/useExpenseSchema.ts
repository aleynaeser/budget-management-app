import * as Yup from 'yup';
import { v4 as uuidv4 } from 'uuid';
import { BMConfig } from '@common/config';
import { priceValidationSchema } from '@common/schemas';
import { IExpense, IExpenseCategory } from '../interfaces';
import useExpenseCategorySchema from './useExpenseCategorySchema';

export default function useExpenseSchema(expense?: IExpense) {
  const { expenseCategorySchema } = useExpenseCategorySchema();

  const expenseSchema: Yup.ObjectSchema<IExpense> = Yup.object({
    id: Yup.string().required('ID is required.'),
    name: Yup.string().required('Expense Name is required.'),
    description: Yup.string(),
    price: priceValidationSchema(),
    date: Yup.string().required('Date is required.'),
    category: expenseCategorySchema,
  });

  const expenseSchemaInitialValues: IExpense = expense
    ? { ...expense }
    : {
        id: uuidv4(),
        name: '',
        date: '',
        description: '',
        category: undefined as unknown as IExpenseCategory,
        price: {
          amount: 0,
          currency: BMConfig.defaultCurrency,
        },
      };

  return { expenseSchema, expenseSchemaInitialValues };
}
