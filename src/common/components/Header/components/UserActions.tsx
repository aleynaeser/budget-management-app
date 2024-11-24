'use client';

import { Link } from '@i18n/routing';
import { motion, Variants } from 'framer-motion';
import { BMConfig } from '@common/config';
import { THEME_CODES } from '@common/enums';
import { useLayoutInitialization } from '@common/providers';
import Image from 'next/image';
import BMIcon from '@components/BMIcon';
import classNames from 'classnames';

export default function UserActions() {
  const { theme, setTheme } = useLayoutInitialization();

  const isLightTheme = theme === THEME_CODES.LIGHT;

  const themeLightVariants: Variants = {
    light: { scale: 1, rotate: 0 },
    dark: { scale: 0, rotate: -360 },
  };

  const themeDarkVariants: Variants = {
    light: { scale: 0, rotate: 360 },
    dark: { scale: 1, rotate: 0 },
  };

  return (
    <section className='user-actions'>
      <motion.button
        type='button'
        whileTap={{ scale: 0.98 }}
        className={classNames('theme-button', { [theme]: theme })}
        onClick={() => setTheme(isLightTheme ? THEME_CODES.DARK : THEME_CODES.LIGHT)}
      >
        <motion.div
          className='theme-icon'
          variants={themeLightVariants}
          initial='light'
          animate={isLightTheme ? 'light' : 'dark'}
          transition={{ duration: 0.3 }}
        >
          <BMIcon icon='bm-theme-light' size='20' />
        </motion.div>

        <motion.div
          className='theme-icon'
          variants={themeDarkVariants}
          initial='light'
          animate={isLightTheme ? 'light' : 'dark'}
          transition={{ duration: 0.3 }}
        >
          <BMIcon icon='bm-theme-dark' size='20' />
        </motion.div>
      </motion.button>

      <Link className='user-profile' href='/dashboard'>
        <Image src={BMConfig.defaultUserPicture} alt='User Profile Picture' fill priority sizes='50' />
      </Link>
    </section>
  );
}
