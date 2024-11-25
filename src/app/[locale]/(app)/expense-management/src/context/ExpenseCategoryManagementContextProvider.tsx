'use client';

import { IExpenseCategory } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { createContext, useContext, useState } from 'react';
import { useManageQuery, useManageStorage } from '@common/hooks';

interface IExpenseCategoryManagementContextProvider {
  children: React.ReactNode;
  expenseCategoryId: string;
}

interface IExpenseCategoryManagementContext {
  expenseCategoryId: string;
  expenseCategory?: IExpenseCategory;
  setExpenseCategory: (expenseCategory?: IExpenseCategory, push?: boolean) => void;
  expenseCategories: IExpenseCategory[];
  isExpenseCategoriesLoading: boolean;
}

export const expenseCategoryManagementContext = createContext<IExpenseCategoryManagementContext | undefined>(undefined);

export function ExpenseCategoryManagementContextProvider({
  children,
  expenseCategoryId,
}: IExpenseCategoryManagementContextProvider) {
  const { setQuery, deleteQuery } = useManageQuery();
  const { getLocalStorageData } = useManageStorage<IExpenseCategory[]>();

  const {
    data: expenseCategories,
    isLoading: isExpenseCategoriesLoading,
    isFetched,
  } = useQuery({
    queryKey: ['list-expense-categories'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.EXPENSE_CATEGORIES) ?? [],
  });

  const [expenseCategory, setExpenseCategory] = useState<IExpenseCategory | undefined>();

  const { data } = useQuery({
    enabled: !!expenseCategoryId && isFetched,
    queryKey: ['get-expense-category'],
    queryFn: () => {
      const category = expenseCategories?.find((category) => category.id === expenseCategoryId);
      setExpenseCategory(category);
      return category;
    },
  });

  const toggleExpenseCategory = (category?: IExpenseCategory, push?: boolean) => {
    if (push && category) {
      setExpenseCategory(category);
      setQuery([{ id: 'expenseCategoryId', value: category.id }]);
    } else {
      setExpenseCategory(undefined);
      deleteQuery('expenseCategoryId');
    }
  };

  return (
    <expenseCategoryManagementContext.Provider
      value={{
        expenseCategory,
        expenseCategoryId,
        setExpenseCategory: toggleExpenseCategory,
        expenseCategories: expenseCategories ?? [],
        isExpenseCategoriesLoading,
      }}
    >
      {children}
    </expenseCategoryManagementContext.Provider>
  );
}

export const useExpenseCategoryManagementContext = () => {
  const context = useContext(expenseCategoryManagementContext);
  if (context === undefined) {
    throw new Error('useExpenseCategoryManagementContext must be used within a ExpenseCategoryManagementContextProvider');
  }
  return context;
};
