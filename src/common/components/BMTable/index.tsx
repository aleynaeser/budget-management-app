import { useState } from 'react';
import { IBMTable } from './src/interface/table.interface';
import { getCoreRowModel, PaginationState, useReactTable, getPaginationRowModel } from '@tanstack/react-table';
import classNames from 'classnames';
import TableHead from './src/components/TableHead';
import TableBody from './src/components/TableBody';
import useTableColumns from './src/helpers/useTableColumns';
import TablePagination from './src/components/TablePagination';
import TableEmptyContent from './src/components/TableEmptyContent';

import './src/sass/bm-table.scss';

export default function BMTable<TData>({
  id,
  data,
  state,
  className,
  emptyContent,
  columns: columnItems,
  isLoading,
  tableRef,
  ...tableProps
}: IBMTable<TData>) {
  const columns = useTableColumns(columnItems);
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 10 });

  const table = useReactTable({
    ...tableProps,
    columns,
    data,
    columnResizeMode: 'onChange',
    columnResizeDirection: 'ltr',
    autoResetPageIndex: false,
    state: { pagination },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div
      id={id}
      ref={tableRef}
      className={classNames(`bm-table-container`, {
        [className!]: className,
        empty: data.length <= 0,
        loading: isLoading,
      })}
    >
      <div className='bm-table-wrapper'>
        <table className='bm-table'>
          <TableHead<TData> table={table} />
          <TableBody<TData> table={table} isLoading={isLoading} />
        </table>
      </div>

      {data.length <= 0 && <TableEmptyContent content={emptyContent} />}
      {data.length > 0 && <TablePagination table={table} />}
    </div>
  );
}
