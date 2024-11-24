import classNames from 'classnames';
import './bm-title.scss';

interface IBMTitle {
  title: string;
  innerText?: string;
  size?: 'sm' | 'lg';
}

export default function BMTitle({ title, innerText, size = 'lg' }: IBMTitle) {
  const words = title.split(' ');
  const boldText = words[0];
  const lightText = words.slice(1).join(' ');

  return (
    <h3 className={classNames('bm-title', { [size]: size })}>
      <strong>{boldText}</strong>
      {innerText && <span> {innerText}</span>}
      <span> {lightText}</span>
    </h3>
  );
}
