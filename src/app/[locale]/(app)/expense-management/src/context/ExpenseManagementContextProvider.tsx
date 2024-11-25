'use client';

import { IExpense } from '../interfaces';
import { useQuery } from '@tanstack/react-query';
import { LOCAL_STORAGE_KEYS } from '@common/enums';
import { createContext, useContext, useState } from 'react';
import { useManageQuery, useManageStorage } from '@common/hooks';

interface IExpenseManagementContextProvider {
  children: React.ReactNode;
  expenseId: string;
}

interface IExpenseManagementContext {
  expenseId: string;
  expense?: IExpense;
  setExpense: (expense?: IExpense, push?: boolean) => void;
  expenses: IExpense[];
  isExpensesLoading: boolean;
}

export const expenseManagementContext = createContext<IExpenseManagementContext | undefined>(undefined);

export function ExpenseManagementContextProvider({ children, expenseId }: IExpenseManagementContextProvider) {
  const { setQuery, deleteQuery } = useManageQuery();
  const { getLocalStorageData } = useManageStorage<IExpense[]>();

  const {
    data: expenses,
    isLoading: isExpensesLoading,
    isFetched,
  } = useQuery({
    queryKey: ['list-expenses'],
    queryFn: () => getLocalStorageData(LOCAL_STORAGE_KEYS.EXPENSES) ?? [],
  });

  const [expense, setExpense] = useState<IExpense | undefined>();

  const { data } = useQuery({
    enabled: !!expenseId && isFetched,
    queryKey: ['get-expense'],
    queryFn: () => {
      const expense = expenses?.find((expense) => expense.id === expenseId);
      setExpense(expense);
      return expense;
    },
  });

  const toggleExpense = (expense?: IExpense, push?: boolean) => {
    if (push && expense) {
      setExpense(expense);
      setQuery([{ id: 'expenseId', value: expense.id }]);
    } else {
      setExpense(undefined);
      deleteQuery('expenseId');
    }
  };

  return (
    <expenseManagementContext.Provider
      value={{
        expense,
        expenseId,
        setExpense: toggleExpense,
        expenses: expenses ?? [],
        isExpensesLoading,
      }}
    >
      {children}
    </expenseManagementContext.Provider>
  );
}

export const useExpenseManagementContext = () => {
  const context = useContext(expenseManagementContext);
  if (context === undefined) {
    throw new Error('useExpenseManagementContext must be used within a ExpenseManagementContextProvider');
  }
  return context;
};
