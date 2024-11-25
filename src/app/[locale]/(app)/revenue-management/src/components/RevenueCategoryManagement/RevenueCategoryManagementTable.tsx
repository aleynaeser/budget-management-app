'use client';

import { useManageStorage } from '@common/hooks';
import { ColumnDef } from '@tanstack/react-table';
import { ActionButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { IRevenueCategory } from '../../interfaces';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRevenueCategoryManagementContext } from '../../context';
import BMTable from '@components/BMTable';

export default function RevenueCategoryManagementTable({ tableRef }: { tableRef: React.RefObject<HTMLDivElement> }) {
  const queryClient = useQueryClient();
  const { setLocalStorageData } = useManageStorage<IRevenueCategory[]>();
  const { revenueCategories, isRevenueCategoriesLoading, setRevenueCategory } = useRevenueCategoryManagementContext();

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-revenue-category'],
    mutationFn: (id: string) => {
      const updatedRevenueCategories = revenueCategories.filter((revenueCategory) => revenueCategory.id !== id);
      return Promise.resolve(setLocalStorageData({ [LOCAL_STORAGE_KEYS.REVENUE_CATEGORIES]: updatedRevenueCategories }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-revenue-categories'] });
    },
  });

  const columns: ColumnDef<IRevenueCategory, string>[] = [
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
      header: 'Actions',
      accessorKey: '_actions',
      meta: { width: '80px' },
      cell: ({ row }) => {
        return (
          <div className='actions-cell'>
            <ActionButton variant='edit' onClick={() => setRevenueCategory(row.original, true)} />
            <ActionButton variant='delete' onClick={() => mutateAsync(row.original.id)} />
          </div>
        );
      },
    },
  ];

  return (
    <BMTable<IRevenueCategory>
      data={revenueCategories}
      columns={columns}
      isLoading={isRevenueCategoriesLoading}
      tableRef={tableRef}
    />
  );
}
