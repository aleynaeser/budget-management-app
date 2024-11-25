'use client';

import { useRef } from 'react';
import { BMTitle, BMToolbar, LayoutCard } from '@components/Layout';
import RevenueCategoryManagementForm from './RevenueCategoryManagementForm';
import RevenueCategoryManagementTable from './RevenueCategoryManagementTable';

export default function RevenueCategoryManagement() {
  const printRevenueCategoryTableRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutCard id='revenue-category-management' className='col-span-5 sm:col-span-12' containerTag='section'>
      <div className='revenue-category-management-form-content'>
        <BMTitle title='Revenue Category Form' />
        <RevenueCategoryManagementForm />
      </div>

      <div className='revenue-category-management-table-content'>
        <BMToolbar title='Revenue Category Table' printComponentRef={printRevenueCategoryTableRef} />
        <RevenueCategoryManagementTable tableRef={printRevenueCategoryTableRef} />
      </div>
    </LayoutCard>
  );
}
