import { useFormatter } from 'next-intl';
import { useCallback, useMemo } from 'react';
import { CellContext } from '@tanstack/react-table';
import { IBMTable } from '../interface/table.interface';

export default function useTableColumns<TData>(columnItems: IBMTable<TData>['columns']) {
  const format = useFormatter();
  
  const formatCell = useCallback((formatter: string, info: CellContext<TData, any>) => {
    switch (formatter) {
      case 'price':
        const price = info.getValue();
        const formettedPrice = format.number(price.amount, {
          ...(price.currency && { style: 'currency', currency: price.currency }),
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
        return formettedPrice;
      case 'colorHexCode':
        const colorHexCode = info.getValue();
        return <div style={{ backgroundColor: colorHexCode ?? `var(--theme-no-color)` }} className='color-cell' />;
    }
  }, []);

  const columns = useMemo(() => {
    return columnItems.map((column) => {
      if (column.meta?.formatter) {
        return {
          ...column,
          cell: (info: CellContext<TData, any>) => formatCell(column.meta!.formatter!, info),
        };
      }
      return column;
    });
  }, [columnItems, formatCell]);

  return columns;
}
