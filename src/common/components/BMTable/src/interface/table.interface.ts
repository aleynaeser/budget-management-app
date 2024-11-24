import { Row, RowData, TableOptions } from '@tanstack/react-table';

export interface IBMTable<TData extends RowData> extends Omit<TableOptions<TData>, 'getCoreRowModel'> {
  id?: string;
  className?: string;
  emptyContent?: string;
  isLoading?: boolean;
}

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    rowClassName?: ((row: Row<TData>) => string) | string;
    headClassName?: string;
    formatter?: string;
    width?: string;
  }
}
