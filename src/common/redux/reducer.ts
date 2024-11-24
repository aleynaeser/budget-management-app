import { combineReducers } from '@reduxjs/toolkit';
import { globalReducer } from './features/globalSlice';

const rootReducer = combineReducers({
  globalReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
