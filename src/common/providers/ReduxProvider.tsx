'use client';

import { Provider } from 'react-redux';
import reduxStore from '../redux/store';

interface IReduxProvider {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: IReduxProvider) {
  return <Provider store={reduxStore}>{children}</Provider>;
}
