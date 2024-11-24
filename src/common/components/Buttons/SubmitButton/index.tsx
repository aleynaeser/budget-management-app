import { MouseEvent } from 'react';
import { motion } from 'framer-motion';
import { FORM_STATUS } from '@common/enums';
import { HTMLMotionProps } from 'framer-motion';
import { useMutationState } from '@tanstack/react-query';
import BMIcon, { TBMIconType } from '@components/BMIcon';
import classNames from 'classnames';

import './submit-button.scss';

type TSubmitButtonContentKeys = 'add' | 'update';

interface ISubmitButton extends Omit<HTMLMotionProps<'button'>, 'onClick' | 'content'> {
  mutationKey?: string;
  icon?: TBMIconType;
  content?: TSubmitButtonContentKeys | string | string[];
  onClick: () => void;
}

export default function SubmitButton({
  icon,
  type = 'submit',
  content = 'add',
  className,
  mutationKey,
  disabled: inputDisabled,
  onClick,
  ...submitButtonProps
}: ISubmitButton) {
  const mutation = useMutationState({ filters: { mutationKey: [mutationKey] } });
  const defaultSubmitContent: Record<TSubmitButtonContentKeys, string[]> = {
    add: ['Add', 'Added'],
    update: ['Update', 'Updated'],
  };

  const buttonContent: string | string[] = defaultSubmitContent[content as keyof typeof defaultSubmitContent] ?? content;
  const mutateStatus = mutationKey && mutation.length > 0 && mutation[mutation.length - 1].status;
  const buttonStatus = mutateStatus || status;
  const submitting = buttonStatus === FORM_STATUS.PENDING;
  const success = buttonStatus === FORM_STATUS.SUCCESS;
  const disabled = submitting;

  const upMotion = {
    initial: { y: 0, opacity: 1, height: 'auto' },
    animateUp: { y: -21, opacity: 0, height: 0, transition: { duration: 0.2, type: 'spring', damping: 10, stiffness: 200 } },
  };

  const scaleMotion = {
    initial: { height: 0, scale: 0 },
    animate: { opacity: 1, scale: 1, height: '12px' },
  };

  const submittedMotion = {
    initial: { y: 0, opacity: 0, height: 0 },
    animateUp: {
      y: -9,
      opacity: 1,
      height: '0',
      transition: { duration: 0.2, type: 'spring', damping: 10, stiffness: 200 },
    },
  };

  return (
    <motion.button
      {...submitButtonProps}
      type={type}
      disabled={disabled || inputDisabled}
      onClick={() => onClick()}
      whileTap={{ scale: 0.96 }}
      transition={{ type: 'spring', stiffness: 130, damping: 10 }}
      className={classNames(`submit-button ${type}`, {
        [className!]: className,
        'with-icon': icon,
        disabled: inputDisabled && !disabled,
        submitting,
        success,
      })}
    >
      {typeof buttonContent === 'string' ? (
        <div className='button-content'>
          {icon && (
            <div className='icon'>
              <BMIcon icon={icon} size={16} color='1' />
            </div>
          )}

          <div className='content'>{buttonContent}</div>
        </div>
      ) : (
        <div className='button-content'>
          <motion.div
            className='default'
            initial='initial'
            animate={submitting || success ? 'animateUp' : 'initial'}
            variants={upMotion}
          >
            {buttonContent && buttonContent[0]}
          </motion.div>

          <motion.div
            className='submit-loading'
            initial='initial'
            animate={submitting ? 'animate' : 'initial'}
            variants={scaleMotion}
          >
            <div className='loading-spinner'></div>
          </motion.div>

          <motion.div
            className='completed'
            initial='initial'
            animate={success ? 'animateUp' : 'initial'}
            variants={submittedMotion}
          >
            {buttonContent && buttonContent[1]}
          </motion.div>
        </div>
      )}
    </motion.button>
  );
}
