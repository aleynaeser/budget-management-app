import { BMTitle, LayoutCard } from '@components/Layout';
import RevenueManagementForm from './RevenueManagementForm';
import RevenueManagementTable from './RevenueManagementTable';

export default async function RevenueManagement() {
  return (
    <LayoutCard id='revenue-management' className='col-span-7 sm:col-span-12' containerTag='section'>
      <BMTitle title='Revenue Form' />
      <RevenueManagementForm />
      <BMTitle title='Revenue Table' />
      <RevenueManagementTable />
    </LayoutCard>
  );
}
