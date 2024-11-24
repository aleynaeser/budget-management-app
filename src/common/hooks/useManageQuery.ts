'use client';

import { useCallback } from 'react';
import { usePathname } from '@i18n/routing';
import { useSearchParams } from 'next/navigation';

export type TQueryParams = {
  id: string;
  value: string | number | undefined;
};

export function useManageQuery() {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const deleteQuery = useCallback(
    (id: string) => {
      const newParams = new URLSearchParams(searchParams.toString());
      newParams.delete(id);
      window.history.pushState({}, '', `${pathName}`);
      return newParams.toString();
    },
    [searchParams, pathName],
  );

  const setQuery = useCallback(
    (params: TQueryParams[]) => {
      const newParams = new URLSearchParams(searchParams.toString());

      const manipulatedParams = params
        .map(({ id, value }) => {
          if (typeof value === 'number') {
            value = value.toString();
          }
          if (value) {
            newParams.set(id, value);
            return `${id}=${value}`;
          } else {
            newParams.delete(id);
            return;
          }
        })
        .filter(Boolean);

      const manipulatedParamsString = manipulatedParams.join('&');
      window.history.pushState({}, '', pathName + '?' + manipulatedParamsString);
      return manipulatedParamsString;
    },
    [searchParams, pathName],
  );

  return { setQuery, deleteQuery };
}
