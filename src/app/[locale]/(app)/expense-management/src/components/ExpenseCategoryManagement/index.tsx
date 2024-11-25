'use client';

import { useRef } from 'react';
import { BMTitle, BMToolbar, LayoutCard } from '@components/Layout';
import ExpenseCategoryManagementForm from './ExpenseCategoryManagementForm';
import ExpenseCategoryManagementTable from './ExpenseCategoryManagementTable';

export default function ExpenseCategoryManagement() {
  const printExpenseCategoryTableRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutCard id='expense-category-management' className='col-span-5 sm:col-span-12' containerTag='section'>
      <div className='expense-category-management-form-content'>
        <BMTitle title='Expense Category Form' />
        <ExpenseCategoryManagementForm />
      </div>

      <div className='expense-category-management-table-content'>
        <BMToolbar title='Expense Category Table' printComponentRef={printExpenseCategoryTableRef} />
        <ExpenseCategoryManagementTable tableRef={printExpenseCategoryTableRef} />
      </div>
    </LayoutCard>
  );
}
