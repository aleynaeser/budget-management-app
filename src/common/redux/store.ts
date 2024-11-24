import { configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootState } from './reducer';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';

const reduxStore = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
});

export type AppDispatch = typeof reduxStore.dispatch;

export const useReduxDispatch: () => AppDispatch = useDispatch;
export const useReduxSelector: TypedUseSelectorHook<RootState> = useSelector;
export default reduxStore;
