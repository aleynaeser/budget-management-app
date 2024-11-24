'use client';

import { Form, Formik } from 'formik';
import { FormItem } from '@components/Inputs';
import { useManageStorage } from '@common/hooks';
import { SubmitButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { IRevenueCategory } from '../../interfaces';
import { useRevenueCategorySchema } from '../../schema';
import { useRevenueCategoryManagementContext } from '../../context';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export default function RevenueCategoryManagementForm() {
  const queryClient = useQueryClient();

  const { setLocalStorageData } = useManageStorage<IRevenueCategory[]>();
  const { revenueCategories, revenueCategory, setRevenueCategory } = useRevenueCategoryManagementContext();
  const { revenueCategorySchema, revenueCategorySchemaInitialValues } = useRevenueCategorySchema(revenueCategory);

  const { mutateAsync, reset } = useMutation({
    gcTime: 0,
    mutationKey: ['revenue-category-form'],
    mutationFn: async (variables: { values: IRevenueCategory; resetForm: () => void }) => {
      const { values } = variables;

      let updatedCategories;

      if (revenueCategory) {
        updatedCategories = revenueCategories.map((category) =>
          category.id === revenueCategory.id ? { ...values, id: revenueCategory.id } : category,
        );
      } else {
        updatedCategories = [...revenueCategories, { ...values }];
      }

      return setLocalStorageData({
        [LOCAL_STORAGE_KEYS.REVENUE_CATEGORIES]: updatedCategories,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['list-revenue-categories'] });
      setTimeout(() => {
        variables.resetForm();
        revenueCategory && setRevenueCategory(undefined);
      }, 1000);
    },
    onSettled: () => {
      setTimeout(() => reset(), 1000);
    },
  });

  return (
    <Formik
      initialValues={revenueCategorySchemaInitialValues}
      onSubmit={async (values, { resetForm }) => mutateAsync({ values, resetForm })}
      validationSchema={revenueCategorySchema}
      enableReinitialize
    >
      {({ resetForm, handleSubmit }) => {
        return (
          <Form className='revenue-category-management-form'>
            <div className='form-groups'>
              <div className='form-group'>
                <FormItem name='colorHexCode' label='Color' type='color' />
                <FormItem name='name' label='Category Name' required />
              </div>
            </div>

            <div className='form-buttons'>
              <SubmitButton
                type='reset'
                content='Reset'
                onClick={() => {
                  setRevenueCategory(undefined);
                  resetForm();
                }}
              />

              <SubmitButton
                mutationKey='revenue-category-form'
                content={revenueCategory ? 'update' : 'add'}
                onClick={handleSubmit}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
