'use client';

import { useFormikContext } from 'formik';
import { SketchPicker } from 'react-color';
import { useEffect, useState } from 'react';
import { AnimatePresence, Variants, motion } from 'framer-motion';
import BMIcon from '@components/BMIcon';
import classNames from 'classnames';

import './color-input.scss';

export default function ColorInput({ name = 'colorHexCode' }: { name?: string }) {
  const { values, setFieldValue } = useFormikContext<{ [key: string]: string }>();

  const color = values[name];
  const [showColorPicker, setShowColorPicker] = useState(false);

  useEffect(() => {
    setFieldValue(name, color);
    color ? setFieldValue(name, color) : setFieldValue(name, '#3e3e3e');
  }, [name, color, setFieldValue]);

  const animateCenterModalVariants: Variants = {
    out: { opacity: 0, y: 30, x: '50%', transform: 'translateX(-50%) translateY(30px)' },
    in: { opacity: 1, y: 0, x: '50%', transform: 'translateX(-50%) translateY(0px)' },
  };

  return (
    <div
      className={classNames('color-input-container', {
        'show-picker': showColorPicker,
        picked: color !== '#3e3e3e',
      })}
    >
      <div className='color-input'>
        <div
          className='color'
          style={{
            backgroundColor: color?.toString(),
          }}
          onClick={() => setShowColorPicker(!showColorPicker)}
        ></div>

        <button type='button' className='reset-button' onClick={() => setFieldValue(name, '#3e3e3e')}>
          <BMIcon icon='bm-close' size='10' />
        </button>
      </div>

      <AnimatePresence mode='popLayout'>
        {showColorPicker && (
          <motion.div
            className='color-picker-modal'
            initial='out'
            exit='out'
            variants={animateCenterModalVariants}
            animate={showColorPicker ? 'in' : 'out'}
            transition={{ type: 'spring', duration: 0.2 }}
          >
            <SketchPicker disableAlpha color={color} onChange={(color) => setFieldValue(name, color.hex)}  />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
