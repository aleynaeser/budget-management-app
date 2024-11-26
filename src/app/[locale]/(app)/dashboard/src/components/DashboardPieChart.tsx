'use client';

import PieChart from '@components/PieChart';
import { useDashboardContext } from '../context';
import { BMTitle, LayoutCard } from '@components/Layout';

export default function DashboardPieChart() {
  const { budgetSummary } = useDashboardContext();

  return (
    <LayoutCard id='dashboard-pie-chart' className='col-span-7 sm:col-span-12'>
      <BMTitle title='Budget Summary' />

      <PieChart data={[budgetSummary.revenue, budgetSummary.expense]} />
    </LayoutCard>
  );
}
