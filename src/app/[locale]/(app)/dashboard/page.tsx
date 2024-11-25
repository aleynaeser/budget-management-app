import { Metadata } from 'next';
import { DashboardContextProvider } from './src/context/DashboardContext';
import DashboardHeader from './src/components/DashboardHeader';
import DashboardSlider from './src/components/DashboardSlider';
import DashboardPieChart from './src/components/DashboardPieChart';
import DashboardSwiper from './src/components/DashboardSwiper/index.';

import './src/sass/dashboard.scss';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Dashboard Page',
};

export default async function Dashboard() {
  return (
    <DashboardContextProvider>
      <main id='dashboard'>
        <DashboardHeader />

        <section className='dashboard-content grid grid-cols-12 gap-20'>
          <DashboardPieChart />
          <DashboardSlider />

          <DashboardSwiper />
        </section>
      </main>
    </DashboardContextProvider>
  );
}
