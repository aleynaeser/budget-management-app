import { INotification } from '@common/interfaces';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface IReduxGlobalState {
  theme: string;
  notification: INotification | undefined; //or INotification[]
}

const initialState: IReduxGlobalState = {
  theme: '',
  notification: undefined,
};

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    pushNotification: (state, action: PayloadAction<INotification>) => {
      state.notification = action.payload;
    },
    removeNotification: (state) => {
      state.notification = undefined;
    },
  },
});

export const globalReducer = globalSlice.reducer;
export const { pushNotification, removeNotification } = globalSlice.actions;
