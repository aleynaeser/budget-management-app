'use client';

import { IRevenueCategory } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { createContext, useContext, useState } from 'react';
import { useManageQuery, useManageStorage } from '@common/hooks';

interface IRevenueCategoryManagementContextProvider {
  children: React.ReactNode;
  revenueCategoryId: string;
}

interface IRevenueCategoryManagementContext {
  revenueCategoryId: string;
  revenueCategory?: IRevenueCategory;
  setRevenueCategory: (revenueCategory?: IRevenueCategory, push?: boolean) => void;
  revenueCategories: IRevenueCategory[];
  isRevenueCategoriesLoading: boolean;
}

export const revenueCategoryManagementContext = createContext<IRevenueCategoryManagementContext | undefined>(undefined);

export function RevenueCategoryManagementContextProvider({
  children,
  revenueCategoryId,
}: IRevenueCategoryManagementContextProvider) {
  const { setQuery, deleteQuery } = useManageQuery();
  const { getLocalStorageData } = useManageStorage<IRevenueCategory[]>();

  const {
    data: revenueCategories,
    isLoading: isRevenueCategoriesLoading,
    isFetched,
  } = useQuery({
    queryKey: ['list-revenue-categories'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.REVENUE_CATEGORIES) ?? [],
  });

  const [revenueCategory, setRevenueCategory] = useState<IRevenueCategory | undefined>();

  const { data } = useQuery({
    enabled: !!revenueCategoryId && isFetched,
    queryKey: ['get-revenue-category'],
    queryFn: () => {
      const category = revenueCategories?.find((category) => category.id === revenueCategoryId);
      setRevenueCategory(category);
      return category;
    },
  });

  const toggleRevenueCategory = (category?: IRevenueCategory, push?: boolean) => {
    if (push && category) {
      setRevenueCategory(category);
      setQuery([{ id: 'revenueCategoryId', value: category.id }]);
    } else {
      setRevenueCategory(undefined);
      deleteQuery('revenueCategoryId');
    }
  };

  return (
    <revenueCategoryManagementContext.Provider
      value={{
        revenueCategory,
        revenueCategoryId,
        setRevenueCategory: toggleRevenueCategory,
        revenueCategories: revenueCategories ?? [],
        isRevenueCategoriesLoading,
      }}
    >
      {children}
    </revenueCategoryManagementContext.Provider>
  );
}

export const useRevenueCategoryManagementContext = () => {
  const context = useContext(revenueCategoryManagementContext);
  if (context === undefined) {
    throw new Error('useRevenueCategoryManagementContext must be used within a RevenueCategoryManagementContextProvider');
  }
  return context;
};
