import { useRouter } from '@i18n/routing';
import { BMTitle } from '@components/Layout';
import { ActionButton } from '@components/Buttons';
import { IBudgetSummaryItem } from '@dashboard/src/interfaces';

interface IDashboardSwiperItem {
  item: IBudgetSummaryItem;
}

export default function DashboardSwiperItem({ item }: IDashboardSwiperItem) {
  const router = useRouter();

  return (
    <div className='swiper-item revenue'>
      <div className='swiper-header'>
        <BMTitle title={`Your ${item.label} Report`} />

        <div className='swiper-total-length'>{item.totalLength} Total Items</div>
      </div>

      <ActionButton variant='navigate' onClick={() => router.push(item.path)} className='swiper-navigate-button' />
    </div>
  );
}
