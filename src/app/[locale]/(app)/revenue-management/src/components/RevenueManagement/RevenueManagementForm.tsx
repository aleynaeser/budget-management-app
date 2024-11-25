'use client';

import { Form, Formik } from 'formik';
import { useRevenueSchema } from '../../schema';
import { useManageStorage } from '@common/hooks';
import { SubmitButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { useRevenueManagementContext } from '../../context';
import { IRevenue, IRevenueCategory } from '../../interfaces';
import { PriceInput, FormItem, SelectInput } from '@components/Inputs';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export default function RevenueManagementForm() {
  const queryClient = useQueryClient();

  const { setLocalStorageData } = useManageStorage<IRevenue[]>();
  const { getLocalStorageData } = useManageStorage<IRevenueCategory[]>();
  const { revenues, revenue, setRevenue } = useRevenueManagementContext();
  const { revenueSchema, revenueSchemaInitialValues } = useRevenueSchema(revenue);

  const { mutateAsync, reset } = useMutation({
    gcTime: 0,
    mutationKey: ['revenue-form'],
    mutationFn: async (variables: { values: IRevenue; resetForm: () => void }) => {
      const { values } = variables;

      let updatedRevenues;

      if (revenue) {
        updatedRevenues = revenues.map((revenue) => (revenue.id === values.id ? { ...values, id: revenue.id } : revenue));
      } else {
        updatedRevenues = [...revenues, { ...values }];
      }

      return setLocalStorageData({
        [LOCAL_STORAGE_KEYS.REVENUES]: updatedRevenues,
      });
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['list-revenues'] });
      setTimeout(() => {
        variables.resetForm();
        revenue && setRevenue(undefined);
      }, 1000);
    },
    onSettled: () => {
      setTimeout(() => reset(), 1000);
    },
  });

  const { data: revenueCategories } = useQuery({
    queryKey: ['list-revenue-categories'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.REVENUE_CATEGORIES),
  });

  return (
    <Formik
      initialValues={revenueSchemaInitialValues}
      onSubmit={async (values, { resetForm }) => mutateAsync({ values, resetForm })}
      validationSchema={revenueSchema}
      enableReinitialize
    >
      {({ resetForm, handleSubmit }) => {
        return (
          <Form id='revenue-management-form'>
            <div className='form-groups'>
              <div className='form-group'>
                <FormItem name='name' label='Revenue Name' required />

                <FormItem name='category.name' label='Revenue Category' required>
                  <SelectInput<IRevenueCategory> name='category' options={revenueCategories ?? []} />
                </FormItem>
              </div>

              <div className='form-group'>
                <FormItem name='price.amount' label='Revenue' required>
                  <PriceInput />
                </FormItem>

                <FormItem name='date' label='Revenue Date' type='date' required />
              </div>

              <FormItem
                name='description'
                label='Revenue Description'
                component='textarea'
                placeholder='Type revenue details...'
              />
            </div>

            <div className='form-buttons'>
              <SubmitButton
                type='reset'
                content='Reset'
                onClick={() => {
                  setRevenue(undefined);
                  resetForm();
                }}
              />

              <SubmitButton mutationKey='revenue-form' content={revenue ? 'update' : 'add'} onClick={handleSubmit} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}
