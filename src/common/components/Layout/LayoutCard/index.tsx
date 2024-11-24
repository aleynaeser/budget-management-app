import classNames from 'classnames';
import { MotionAside, MotionDiv, MotionForm, MotionMain, MotionSection, MotionHeader } from '../Motion';

import './layout-card.scss';

export interface ILayoutCard {
  id?: string;
  className?: string;
  children?: React.ReactNode;
  animateDuration?: number;
  containerTag?: 'div' | 'section' | 'main' | 'aside' | 'header';
}

export default function LayoutCard({
  id,
  children,
  className = '',
  animateDuration = 0.3,
  containerTag = 'div',
}: ILayoutCard) {
  const motionMap = {
    div: MotionDiv,
    section: MotionSection,
    main: MotionMain,
    aside: MotionAside,
    header: MotionHeader,
    form: MotionForm,
  };

  const Card = motionMap[containerTag];

  return (
    <Card
      id={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: animateDuration } }}
      exit={{ opacity: 0, transition: { duration: animateDuration } }}
      className={classNames('layout-card', {
        [className!]: className,
      })}
    >
      {children}
    </Card>
  );
}
