import { v4 as uuidv4 } from 'uuid';
import { IMenuItem } from '@common/interfaces';

export const menuItems: IMenuItem[] = [
  {
    id: uuidv4(),
    title: 'Dashboard',
    path: '/dashboard',
  },
  {
    id: uuidv4(),
    title: 'Revenue Management',
    path: '/revenue-management',
  },
  {
    id: uuidv4(),
    title: 'Expense Management',
    path: '/expense-management',
  },
];
