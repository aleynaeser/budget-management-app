'use client';

import { Form, Formik } from 'formik';
import { expenseAdvisor } from '../../helpers';
import { useExpenseSchema } from '../../schema';
import { useManageStorage } from '@common/hooks';
import { SubmitButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { useReduxDispatch } from '@common/redux/store';
import { useExpenseManagementContext } from '../../context';
import { IExpense, IExpenseCategory } from '../../interfaces';
import { PriceInput, FormItem, SelectInput } from '@components/Inputs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function ExpenseManagementForm() {
  const queryClient = useQueryClient();
  const dispatch = useReduxDispatch();

  const { setLocalStorageData } = useManageStorage<IExpense[]>();
  const { getLocalStorageData } = useManageStorage<IExpenseCategory[]>();
  const { expenses, expense, setExpense } = useExpenseManagementContext();
  const { expenseSchema, expenseSchemaInitialValues } = useExpenseSchema(expense);

  const { mutateAsync, reset } = useMutation({
    gcTime: 0,
    mutationKey: ['expense-form'],
    mutationFn: async (variables: { values: IExpense; resetForm: () => void }) => {
      const { values } = variables;
      let updatedExpenses;

      if (expense) {
        updatedExpenses = expenses.map((expense) => (expense.id === values.id ? { ...values, id: expense.id } : expense));
      } else {
        updatedExpenses = [...expenses, { ...values }];
      }

      return setLocalStorageData({
        [LOCAL_STORAGE_KEYS.EXPENSES]: updatedExpenses,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['list-expenses'] });
      setTimeout(() => {
        variables.resetForm();
        expense && setExpense(undefined);
      }, 1000);
    },
    onSettled: () => {
      setTimeout(() => reset(), 1000);
    },
  });

  const { data: expenseCategories } = useQuery({
    queryKey: ['list-expense-categories'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.EXPENSE_CATEGORIES),
  });

  return (
    <Formik
      initialValues={expenseSchemaInitialValues}
      validationSchema={expenseSchema}
      onSubmit={async (values, { resetForm }) => {
        if (!expenseAdvisor(values, dispatch)) {
          return;
        } else {
          mutateAsync({ values, resetForm });
        }
      }}
      enableReinitialize
    >
      {({ resetForm, handleSubmit }) => {
        return (
          <Form className='expense-management-form'>
            <div className='form-groups'>
              <div className='form-group'>
                <FormItem name='name' label='Expense Name' required />

                <FormItem name='category.name' label='Expense Category' required>
                  <SelectInput<IExpenseCategory> name='category' options={expenseCategories ?? []} />
                </FormItem>
              </div>

              <div className='form-group'>
                <FormItem name='price.amount' label='Expense' required>
                  <PriceInput />
                </FormItem>

                <FormItem name='date' label='Expense Date' type='date' required />
              </div>

              <FormItem
                name='description'
                label='Expense Description'
                component='textarea'
                placeholder='Type expense details...'
              />
            </div>

            <div className='form-buttons'>
              <SubmitButton
                type='reset'
                content='Reset'
                onClick={() => {
                  setExpense(undefined);
                  resetForm();
                }}
              />

              <SubmitButton mutationKey='expense-form' content={expense ? 'update' : 'add'} onClick={handleSubmit} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
