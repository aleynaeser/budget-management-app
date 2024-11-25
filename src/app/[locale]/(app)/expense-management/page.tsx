import ExpenseManagement from './src/components/ExpenseManagement';
import ExpenseCategoryManagement from './src/components/ExpenseCategoryManagement';
import { Metadata } from 'next';
import { ExpenseManagementContextProvider, ExpenseCategoryManagementContextProvider } from './src/context';

import './src/sass/expense-management.scss';

type TExpenseManagementPage = {
  searchParams: { expenseId: string; expenseCategoryId: string };
};

export const metadata: Metadata = {
  title: 'Expense Management',
  description: 'Expense Management Page',
};

export default async function ExpenseManagementPage({ searchParams }: TExpenseManagementPage) {
  const { expenseId, expenseCategoryId } = searchParams;

  return (
    <main id='expense-management-page' className='grid grid-cols-12 gap-20'>
      <ExpenseManagementContextProvider expenseId={expenseId}>
        <ExpenseManagement />
      </ExpenseManagementContextProvider>

      <ExpenseCategoryManagementContextProvider expenseCategoryId={expenseCategoryId}>
        <ExpenseCategoryManagement />
      </ExpenseCategoryManagementContextProvider>
    </main>
  );
}
