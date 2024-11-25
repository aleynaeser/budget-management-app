'use client';

import { useEffect, useState } from 'react';
import { useDashboardContext } from '../context';
import { currencyOptions } from '@common/constants';
import classNames from 'classnames';

export default function DashboardSlider() {
  const { sliderData } = useDashboardContext();
  const [resetScroll, setResetScroll] = useState(false);

  useEffect(() => {
    setResetScroll(true);

    setTimeout(() => {
      setResetScroll(false);
    }, 100);
  }, []);

  return (
    <section id='dashboard-slider'>
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <div className={classNames('dashboard-slider-container', { reset: resetScroll })} key={index}>
            {sliderData.map((item) => {
              const currency = currencyOptions.find((option) => option.code === item.price.currency);

              return (
                <div key={item.date} className='dashboard-slider-item'>
                  <div className='item-date'>
                    {new Date(item.date).toLocaleDateString('tr-TR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                    :
                  </div>
                  <div className='item-name'>{item.name}</div>
                  <div className='item-separator'>-</div>
                  <div className='item-price'>
                    {item.price.amount} {currency?.sign}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
    </section>
  );
}
