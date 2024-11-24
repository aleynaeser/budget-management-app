import { Table } from '@tanstack/react-table';
import classNames from 'classnames';
import BMIcon from '@components/BMIcon';

interface ITablePagination<TData> {
  table: Table<TData>;
}

export default function TablePagination<TData>({ table }: ITablePagination<TData>) {
  const totalCount = table.getRowCount();
  const pagination = table.getState().pagination;

  const { pageSize, pageIndex } = pagination;

  return (
    <div className='table-pagination'>
      <div className='pagination-info'>
        Showing {pageIndex * pageSize + 1} - {pageIndex * pageSize + pageSize} of {totalCount} rows
      </div>

      {pageSize && (
        <div className='pagination-buttons'>
          <button
            type='button'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className={classNames('pagination-button prev', { active: table.getCanPreviousPage() })}
          >
            <BMIcon icon='bm-chevron-left' color='11' size='22' />
          </button>

          <button
            type='button'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className={classNames('pagination-button next', { active: table.getCanNextPage() })}
          >
            <BMIcon icon='bm-chevron-right' color='3' size='22' />
          </button>
        </div>
      )}
    </div>
  );
}
