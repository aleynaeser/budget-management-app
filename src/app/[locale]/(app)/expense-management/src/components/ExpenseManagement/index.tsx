'use client';

import { useRef } from 'react';
import { BMTitle, BMToolbar, LayoutCard } from '@components/Layout';
import ExpenseManagementForm from './ExpenseManagementForm';
import ExpenseManagementTable from './ExpenseManagementTable';

export default function ExpenseManagement() {
  const printExpenseTableRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutCard id='expense-management' className='col-span-7 sm:col-span-12' containerTag='section'>
      <div className='expense-management-form-content'>
        <BMTitle title='Expense Form' />
        <ExpenseManagementForm />
      </div>

      <div className='expense-management-table-content'>
        <BMToolbar title='Expense Table' printComponentRef={printExpenseTableRef} />
        <ExpenseManagementTable tableRef={printExpenseTableRef} />
      </div>
    </LayoutCard>
  );
}
