import { Fragment } from 'react';
import { bmIconSet } from './bm-icon-set';
import { IconBaseProps } from 'react-icons/lib';
import classNames from 'classnames';

export type TBMIconType = keyof typeof bmIconSet;

export interface IBMIcon extends Omit<IconBaseProps, 'className'> {
  icon: TBMIconType;
  color?: string;
  className?: string;
}

export default function BMIcon({ icon, color, className, ...props }: IBMIcon) {
  const BMIcon = bmIconSet[icon];

  return BMIcon ? (
    <BMIcon
      className={classNames('bm-svg', className)}
      size={props.size ?? 18}
      color={color && `var(--theme-color-${color})`}
      strokeWidth={props.strokeWidth ?? 1.5}
      {...props}
    />
  ) : (
    <Fragment></Fragment>
  );
}
