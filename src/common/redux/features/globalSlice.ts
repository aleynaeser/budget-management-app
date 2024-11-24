import { createSlice } from '@reduxjs/toolkit';

export interface IReduxGlobalState {
  theme: string;
}

const initialState: IReduxGlobalState = {
  theme: '',
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {},
});

export const globalReducer = globalSlice.reducer;
export const {} = globalSlice.actions;
