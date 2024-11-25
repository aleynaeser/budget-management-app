import { motion } from 'framer-motion';
import { HTMLMotionProps } from 'framer-motion';
import BMIcon, { TBMIconType } from '@components/BMIcon';

import classNames from 'classnames';

import './action-button.scss';

type TActionButtonVariant = 'delete' | 'edit' | 'navigate';

interface IActionButton extends HTMLMotionProps<'button'> {
  className?: string;
  icon?: TBMIconType;
  variant?: TActionButtonVariant;
}

export default function ActionButton({ className, icon, variant = 'delete', ...buttonProps }: IActionButton) {
  const buttonType = buttonProps.type || 'button';

  const iconMap: Record<TActionButtonVariant, TBMIconType> = { delete: 'bm-delete', edit: 'bm-edit', navigate: 'cds-navigate' };
  const iconType = icon ?? iconMap[variant];

  return (
    <motion.button
      {...buttonProps}
      type={buttonType}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 130, damping: 10 }}
      tabIndex={-1}
      className={classNames('action-button', {
        [className!]: className,
        [variant]: variant,
      })}
    >
      <BMIcon icon={iconType} size='16' />
    </motion.button>
  );
}
