'use client';

import { useManageStorage } from '@common/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { ActionButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { IExpenseCategory } from '../../interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useExpenseCategoryManagementContext } from '../../context';
import BMTable from '@components/BMTable';

export default function ExpenseCategoryManagementTable({ tableRef }: { tableRef: React.RefObject<HTMLDivElement> }) {
  const queryClient = useQueryClient();
  const { setLocalStorageData } = useManageStorage<IExpenseCategory[]>();
  const { expenseCategories, isExpenseCategoriesLoading, setExpenseCategory } = useExpenseCategoryManagementContext();

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-expense-category'],
    mutationFn: (id: string) => {
      const updatedExpenseCategories = expenseCategories.filter((expenseCategory) => expenseCategory.id !== id);
      return Promise.resolve(setLocalStorageData({ [LOCAL_STORAGE_KEYS.EXPENSE_CATEGORIES]: updatedExpenseCategories }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-expense-categories'] });
    },
  });

  const columns: ColumnDef<IExpenseCategory, string>[] = [
    {
      accessorKey: 'colorHexCode',
      header: 'Color',
      meta: { formatter: 'colorHexCode', width: '80px' },
    },
    {
      accessorKey: 'name',
      header: 'Category Name',
    },
    {
      accessorKey: 'maxThreshold',
      header: 'Max Threshold',
      meta: { formatter: 'price' },
    },
    {
      header: 'Actions',
      accessorKey: '_actions',
      meta: { width: '80px' },
      cell: ({ row }) => {
        return (
          <div className='actions-cell'>
            <ActionButton variant='edit' onClick={() => setExpenseCategory(row.original, true)} />
            <ActionButton variant='delete' onClick={() => mutateAsync(row.original.id)} />
          </div>
        );
      },
    },
  ];

  return (
    <BMTable<IExpenseCategory>
      data={expenseCategories}
      columns={columns}
      isLoading={isExpenseCategoriesLoading}
      tableRef={tableRef}
    />
  );
}
