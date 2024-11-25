'use client';

import { LayoutCard } from '@components/Layout';
import { useDashboardContext } from '../../context';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import DashboardSwiperItem from './DashboardSwiperItem';

export default function DashboardSwiper() {
  const { summary } = useDashboardContext();

  return (
    <LayoutCard id='dashboard-swiper' className='col-span-5 sm:col-span-12' containerTag='section'>
      <Swiper
        loop={true}
        className='dashboard-swiper-container'
        centeredSlides={true}
        modules={[Autoplay, Pagination, Navigation]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
          dynamicMainBullets: 2,
          bulletElement: 'span',
        }}
      >
        <SwiperSlide>
          <DashboardSwiperItem item={summary.revenue} />
        </SwiperSlide>

        <SwiperSlide>
          <DashboardSwiperItem item={summary.expense} />
        </SwiperSlide>
      </Swiper>
    </LayoutCard>
  );
}
