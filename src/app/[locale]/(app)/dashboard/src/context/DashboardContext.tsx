'use client';

import { IRevenue } from '@rm/src/interfaces';
import { IExpense } from '@em/src/interfaces';
import { initialSliderData } from '../constants';
import { useManageStorage } from '@common/hooks';
import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { IDashboardSummary, ISliderItem } from '../interfaces';

interface IDashboardContext {
  sliderData: ISliderItem[];
  summary: IDashboardSummary;
}

const dashboardContext = createContext<IDashboardContext | undefined>(undefined);

export function DashboardContextProvider({ children }: { children: React.ReactNode }) {
  const { getLocalStorageData } = useManageStorage<any>();

  const { data: expenses } = useQuery({
    queryKey: ['dashboard-expenses'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.EXPENSES) ?? [],
  });

  const { data: revenues } = useQuery({
    queryKey: ['dashboard-revenues'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.REVENUES) ?? [],
  });

  const sliderData: ISliderItem[] =
    revenues?.length === 0 && expenses?.length === 0
      ? initialSliderData
      : [
          ...(revenues?.slice(0, 5)?.map((revenue: IRevenue) => ({
            name: revenue.name,
            date: revenue.date,
            price: revenue.price,
            type: 'revenue' as const,
          })) ?? []),
          ...(expenses?.slice(0, 5)?.map((expense: IExpense) => ({
            name: expense.name,
            date: expense.date,
            price: expense.price,
            type: 'expense' as const,
          })) ?? []),
        ]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

  const summary: IDashboardSummary = {
    revenue: {
      title: 'Revenue',
      path: '/revenue-management',
      totalLength: revenues?.length ?? 0,
      total: revenues?.reduce((acc: number, curr: IRevenue) => acc + curr.price.amount, 0) ?? 0,
    },
    expense: {
      title: 'Expense',
      path: '/expense-management',
      totalLength: expenses?.length ?? 0,
      total: expenses?.reduce((acc: number, curr: IExpense) => acc + curr.price.amount, 0) ?? 0,
    },
  };

  return (
    <dashboardContext.Provider
      value={{
        sliderData,
        summary,
      }}
    >
      {children}
    </dashboardContext.Provider>
  );
}

export const useDashboardContext = () => {
  const context = useContext(dashboardContext);
  if (context === undefined) {
    throw new Error('useDashboardContext must be used within a DashboardContextProvider');
  }
  return context;
};
