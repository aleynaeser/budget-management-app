'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { menuItems } from '@common/constants';
import { usePathname, useRouter } from '@i18n/routing';
import Logo from './Logo';
import classNames from 'classnames';

export default function Menu() {
  const pathname = usePathname();
  const router = useRouter();

  const [activeIndex, setActiveIndex] = useState<number>();

  const currentMenuItemIndex = menuItems.findIndex((item) => item.path === pathname);

  useEffect(() => {
    setActiveIndex(currentMenuItemIndex);
  }, [currentMenuItemIndex]);

  return (
    <nav id='menu' className='menu-nav'>
      <Logo />

      <ul className='menu-nav-list'>
        {menuItems.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <li
              id={`menu-item-${index}`}
              key={item.title}
              onClick={() => {
                setActiveIndex(index);
                router.push(item.path);
              }}
              className={classNames('menu-nav-item', { active: isActive })}
            >
              {item.title}

              {isActive && (
                <motion.div
                  className='indicator'
                  layoutId='indicator'
                  layoutDependency={pathname}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
