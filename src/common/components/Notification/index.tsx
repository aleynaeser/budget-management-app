'use client';

import { useEffect } from 'react';
import { BMConfig } from '@common/config';
import { NOTIFICATION_TYPE } from '@common/enums';
import BMIcon, { TBMIconType } from '@components/BMIcon';
import { AnimatePresence, motion, Variants } from 'framer-motion';
import { removeNotification } from '@common/redux/features/globalSlice';
import { useReduxDispatch, useReduxSelector } from '@common/redux/store';
import classNames from 'classnames';

import './notification.scss';

type TNotificationIcon = { icon: TBMIconType; color: string };

export default function Notification() {
  const dispatch = useReduxDispatch();
  const notification = useReduxSelector((state) => state.globalReducer.notification);

  const iconMap: Record<NOTIFICATION_TYPE, TNotificationIcon> = {
    success: { icon: 'bm-circle-check', color: '6' },
    error: { icon: 'bm-circle-alert', color: '5' },
    warning: { icon: 'bm-circle-info', color: '7' },
  };

  const visibilityVariants: Variants = {
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: 30 },
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(removeNotification());
    }, BMConfig.notificationDisplayTime);
  }, [notification]);

  return (
    <AnimatePresence mode='wait'>
      {notification && (
        <motion.div
          key={notification.id}
          variants={visibilityVariants}
          initial='out'
          animate='in'
          exit='out'
          transition={{ type: 'spring', duration: 0.3 }}
          className={classNames('notification-container', { [notification.type]: notification.type })}
        >
          <div className='notification-content'>
            <button type='button' className='notification-close-button' onClick={() => dispatch(removeNotification())}>
              <BMIcon icon={iconMap[notification.type].icon} color={iconMap[notification.type].color} size='20' />
            </button>

            <div className='notification'>
              <div className='notification-message'>{notification.message}</div>
              <div className='notification-description'>{notification.description}</div>
            </div>
          </div>

          <BMIcon icon='bm-close' color='10' />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
