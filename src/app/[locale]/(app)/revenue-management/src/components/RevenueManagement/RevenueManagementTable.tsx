'use client';

import { IRevenue } from '../../interfaces';
import { ColumnDef } from '@tanstack/react-table';
import { useManageStorage } from '@common/hooks';
import { ActionButton } from '@components/Buttons';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { useRevenueManagementContext } from '../../context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import BMTable from '@components/BMTable';

export default function RevenueManagementTable({ tableRef }: { tableRef: React.RefObject<HTMLDivElement> }) {
  const queryClient = useQueryClient();
  const { setLocalStorageData } = useManageStorage<IRevenue[]>();
  const { revenues, isRevenuesLoading, setRevenue } = useRevenueManagementContext();

  const { mutateAsync } = useMutation({
    mutationKey: ['delete-revenue'],
    mutationFn: (id: string) => {
      const updatedRevenues = revenues.filter((revenue) => revenue.id !== id);
      return Promise.resolve(setLocalStorageData({ [LOCAL_STORAGE_KEYS.REVENUES]: updatedRevenues }));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['list-revenues'] });
    },
  });

  const columns: ColumnDef<IRevenue, string>[] = [
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
            <ActionButton variant='edit' onClick={() => setRevenue(row.original, true)} />
            <ActionButton variant='delete' onClick={() => mutateAsync(row.original.id)} />
          </div>
        );
      },
    },
  ];

  return <BMTable<IRevenue> data={revenues} columns={columns} isLoading={isRevenuesLoading} tableRef={tableRef} />;
}
