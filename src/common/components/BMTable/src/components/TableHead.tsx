'use client';

import { Table, flexRender } from '@tanstack/react-table';
import classNames from 'classnames';

interface ITableHead<TData> {
  table: Table<TData>;
}

export default function TableHead<TData>({ table }: ITableHead<TData>) {
  const headerGroups = table.getHeaderGroups();

  return (
    <thead className={classNames(`bm-table-thead`)}>
      {headerGroups.map((headerGroup) => {
        return (
          <tr key={headerGroup.id} className='table-head-row'>
            {headerGroup.headers.map((header) => {
              const actionsCell = header.column.id.startsWith('_actions');
              const headClassName = header.column.columnDef.meta?.headClassName;
              const headWidth = header.column.columnDef.meta?.width ?? undefined;
              const headStyle = { width: headWidth, minWidth: headWidth };

              return (
                <th
                  key={header.id}
                  style={headStyle}
                  colSpan={header.colSpan}
                  className={classNames(`head-row`, { [headClassName!]: headClassName, 'head-actions-row': actionsCell })}
                >
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </th>
              );
            })}
          </tr>
        );
      })}
    </thead>
  );
}
