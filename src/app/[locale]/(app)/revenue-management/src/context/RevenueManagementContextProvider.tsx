'use client';

import { IRevenue } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { createContext, useContext, useState } from 'react';
import { useManageQuery, useManageStorage } from '@common/hooks';

interface IRevenueManagementContextProvider {
  children: React.ReactNode;
  revenueId: string;
}

interface IRevenueManagementContext {
  revenueId: string;
  revenue?: IRevenue;
  setRevenue: (revenue?: IRevenue, push?: boolean) => void;
  revenues: IRevenue[];
  isRevenuesLoading: boolean;
}

export const revenueManagementContext = createContext<IRevenueManagementContext | undefined>(undefined);

export function RevenueManagementContextProvider({ children, revenueId }: IRevenueManagementContextProvider) {
  const { setQuery, deleteQuery } = useManageQuery();
  const { getLocalStorageData } = useManageStorage<IRevenue[]>();

  const {
    data: revenues,
    isLoading: isRevenuesLoading,
    isFetched,
  } = useQuery({
    queryKey: ['list-revenues'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.REVENUES) ?? [],
  });

  const [revenue, setRevenue] = useState<IRevenue | undefined>();

  const { data } = useQuery({
    enabled: !!revenueId && isFetched,
    queryKey: ['get-revenue'],
    queryFn: () => {
      const revenue = revenues?.find((revenue) => revenue.id === revenueId);
      setRevenue(revenue);
      return revenue;
    },
  });

  const toggleRevenue = (revenue?: IRevenue, push?: boolean) => {
    if (push && revenue) {
      setRevenue(revenue);
      setQuery([{ id: 'revenueId', value: revenue.id }]);
    } else {
      setRevenue(undefined);
      deleteQuery('revenueId');
    }
  };

  return (
    <revenueManagementContext.Provider
      value={{
        revenue,
        revenueId,
        setRevenue: toggleRevenue,
        revenues: revenues ?? [],
        isRevenuesLoading,
      }}
    >
      {children}
    </revenueManagementContext.Provider>
  );
}

export const useRevenueManagementContext = () => {
  const context = useContext(revenueManagementContext);
  if (context === undefined) {
    throw new Error('useRevenueManagementContext must be used within a RevenueManagementContextProvider');
  }
  return context;
};
