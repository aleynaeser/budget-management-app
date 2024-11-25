'use client';

import { Form, Formik } from 'formik';
import { useManageStorage } from '@common/hooks';
import { SubmitButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { IExpenseCategory } from '../../interfaces';
import { useExpenseCategorySchema } from '../../schema';
import { FormItem, PriceInput } from '@components/Inputs';
import { useExpenseCategoryManagementContext } from '../../context';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function ExpenseCategoryManagementForm() {
  const queryClient = useQueryClient();

  const { setLocalStorageData } = useManageStorage<IExpenseCategory[]>();
  const { expenseCategories, expenseCategory, setExpenseCategory } = useExpenseCategoryManagementContext();
  const { expenseCategorySchema, expenseCategorySchemaInitialValues } = useExpenseCategorySchema(expenseCategory);

  const { mutateAsync, reset } = useMutation({
    gcTime: 0,
    mutationKey: ['expense-category-form'],
    mutationFn: async (variables: { values: IExpenseCategory; resetForm: () => void }) => {
      const { values } = variables;

      let updatedCategories;

      if (expenseCategory) {
        updatedCategories = expenseCategories.map((category) =>
          category.id === expenseCategory.id ? { ...values, id: expenseCategory.id } : category,
        );
      } else {
        updatedCategories = [...expenseCategories, { ...values }];
      }

      return setLocalStorageData({
        [LOCAL_STORAGE_KEYS.EXPENSE_CATEGORIES]: updatedCategories,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['list-expense-categories'] });
      setTimeout(() => {
        variables.resetForm();
        expenseCategory && setExpenseCategory(undefined);
      }, 1000);
    },
    onSettled: () => {
      setTimeout(() => reset(), 1000);
    },
  });

  return (
    <Formik
      initialValues={expenseCategorySchemaInitialValues}
      onSubmit={async (values, { resetForm }) => mutateAsync({ values, resetForm })}
      validationSchema={expenseCategorySchema}
      enableReinitialize
    >
      {({ resetForm, handleSubmit }) => {
        return (
          <Form className='expense-category-management-form'>
            <div className='form-groups'>
              <div className='form-group'>
                <FormItem name='colorHexCode' label='Color' type='color' />
                <FormItem name='name' label='Category Name' required />
                <FormItem name='maxThreshold.amount' label='Max Threshold'>
                  <PriceInput name='maxThreshold.amount' currencyName='maxThreshold.currency' />
                </FormItem>
              </div>
            </div>

            <div className='form-buttons'>
              <SubmitButton
                type='reset'
                content='Reset'
                onClick={() => {
                  setExpenseCategory(undefined);
                  resetForm();
                }}
              />

              <SubmitButton
                mutationKey='expense-category-form'
                content={expenseCategory ? 'update' : 'add'}
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
