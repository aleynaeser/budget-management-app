import { Table, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';

interface ITableBody<TData> {
  table: Table<TData>;
  isLoading?: boolean;
}

export default function TableBody<TData>({ table, isLoading }: ITableBody<TData>) {
  const rowModel = table.getRowModel();
  const columnLength = table.getVisibleFlatColumns().length;

  return isLoading ? (
    <tbody className={classNames(`bm-table-tbody loading`)}>
      {Array.from(Array(table.getState().pagination.pageSize).keys()).map((index) => (
        <tr key={index} className='loading-skeleton-row'>
          <td colSpan={columnLength} className={classNames(`skeleton-data`)}>
            <div className='loading-skeleton' />
          </td>
        </tr>
      ))}
    </tbody>
  ) : (
    <tbody className='bm-table-tbody'>
      {rowModel.rows.map((row) => (
        <tr key={row.id} className='table-row'>
          {row.getVisibleCells().map((cell) => {
            const rowClassName =
              typeof cell.column.columnDef.meta?.rowClassName === 'function'
                ? cell.column.columnDef.meta?.rowClassName(cell.row)
                : cell.column.columnDef.meta?.rowClassName;

            const isCellContextExist = Array.isArray(cell.getContext().getValue())
              ? (cell.getContext().getValue() as Array<unknown>).length > 0
              : cell.getContext().getValue();

            const isCellIdStartWithUnderscore =
              cell.column.id.startsWith('_') || cell.column.accessorFn?.(cell.row.original, cell.column.getIndex());

            const isCellEmpty = !isCellIdStartWithUnderscore && !isCellContextExist;

            return (
              <td
                key={cell.id}
                className={classNames('row-data', {
                  [rowClassName!]: rowClassName,
                  'action-row-data': cell.column.id === '_actions',
                })}
              >
                {isCellEmpty ? (
                  <div className='empty-cell'></div>
                ) : (
                  flexRender(cell.column.columnDef.cell, cell.getContext())
                )}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
}
