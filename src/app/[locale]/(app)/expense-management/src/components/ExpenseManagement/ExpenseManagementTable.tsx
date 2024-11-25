'use client';

import { IExpense } from '../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { useManageStorage } from '@common/hooks';
import { ActionButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { useExpenseManagementContext } from '../../context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BMTable from '@components/BMTable';

export default function ExpenseManagementTable({ tableRef }: { tableRef: React.RefObject<HTMLDivElement> }) {
  const queryClient = useQueryClient();
  const { setLocalStorageData } = useManageStorage<IExpense[]>();
  const { expenses, isExpensesLoading, setExpense } = useExpenseManagementContext();

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-expense'],
    mutationFn: (id: string) => {
      const updatedExpenses = expenses.filter((expense) => expense.id !== id);
      return Promise.resolve(setLocalStorageData({ [LOCAL_STORAGE_KEYS.EXPENSES]: updatedExpenses }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-expenses'] });
    },
  });

  const columns: ColumnDef<IExpense, string>[] = [
    {
      accessorKey: 'category.name',
      header: 'Category',
      cell: ({ row }) => {
        const { name, colorHexCode } = row.original.category;
        return (
          <div className='category-cell' style={{ color: colorHexCode }}>
            {name}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'price',
      header: 'Price',
      meta: { formatter: 'price' },
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: (info) => <div className='description-cell'>{info.getValue()}</div>,
    },
    {
      accessorKey: 'date',
      header: 'Date',
      meta: { formatter: 'date' },
    },
    {
      header: 'Actions',
      accessorKey: '_actions',
      meta: { width: '80px' },
      cell: ({ row }) => {
        return (
          <div className='actions-cell'>
            <ActionButton variant='edit' onClick={() => setExpense(row.original, true)} />
            <ActionButton variant='delete' onClick={() => mutateAsync(row.original.id)} />
          </div>
        );
      },
    },
  ];

  return <BMTable<IExpense> data={expenses} columns={columns} isLoading={isExpensesLoading} tableRef={tableRef} />;
}
