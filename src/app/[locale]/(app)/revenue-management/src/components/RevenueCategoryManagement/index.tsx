import { BMTitle, LayoutCard } from '@components/Layout';
import RevenueCategoryManagementForm from './RevenueCategoryManagementForm';
import RevenueCategoryManagementTable from './RevenueCategoryManagementTable';

export default async function RevenueCategoryManagement() {
  return (
    <LayoutCard id='revenue-category-management' className='col-span-5 sm:col-span-12' containerTag='section'>
      <BMTitle title='Revenue Category Form' />
      <RevenueCategoryManagementForm />
      <BMTitle title='Revenue Category Table' />
      <RevenueCategoryManagementTable />
    </LayoutCard>
  );
}
