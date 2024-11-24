import RevenueManagement from './src/components/RevenueManagement';
import RevenueCategoryManagement from './src/components/RevenueCategoryManagement';
import { RevenueManagementContextProvider, RevenueCategoryManagementContextProvider } from './src/context';

import './src/sass/revenue-management.scss';

type RevenueManagementPageProps = {
  searchParams: { revenueId: string; revenueCategoryId: string };
};

export default async function RevenueManagementPage({ searchParams }: RevenueManagementPageProps) {
  const { revenueId, revenueCategoryId } = searchParams;

  return (
    <main id='revenue-management-page' className='grid grid-cols-12 gap-20'>
      <RevenueManagementContextProvider revenueId={revenueId}>
        <RevenueManagement />
      </RevenueManagementContextProvider>

      <RevenueCategoryManagementContextProvider revenueCategoryId={revenueCategoryId}>
        <RevenueCategoryManagement />
      </RevenueCategoryManagementContextProvider>
    </main>
  );
}
