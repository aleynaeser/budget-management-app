import { Link } from '@i18n/routing';
import BMIcon from '@components/BMIcon';

export default function Logo() {
  return (
    <Link href='/' className='logo'>
      <BMIcon icon='bm-money-bg' size='22' />
    </Link>
  );
}
