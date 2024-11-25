'use client';

import { useRef } from 'react';
import { BMTitle, BMToolbar, LayoutCard } from '@components/Layout';
import RevenueManagementForm from './RevenueManagementForm';
import RevenueManagementTable from './RevenueManagementTable';

export default function RevenueManagement() {
  const printRevenueTableRef = useRef<HTMLDivElement>(null);

  return (
    <LayoutCard id='revenue-management' className='col-span-7 sm:col-span-12' containerTag='section'>
      <div className='revenue-management-form-content'>
        <BMTitle title='Revenue Form' />
        <RevenueManagementForm />
      </div>

      <div className='revenue-management-table-content'>
        <BMToolbar title='Revenue Table' printComponentRef={printRevenueTableRef} />
        <RevenueManagementTable tableRef={printRevenueTableRef} />
      </div>
    </LayoutCard>
  );
}
