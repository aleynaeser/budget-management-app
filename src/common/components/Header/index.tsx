import { LayoutCard } from '@components/Layout';
import UserActions from './components/UserActions';
import Menu from './components/Menu';

import './header.scss';

export default async function Header() {
  return (
    <LayoutCard id='header' containerTag='header'>
      <Menu />
      <UserActions />
    </LayoutCard>
  );
}
