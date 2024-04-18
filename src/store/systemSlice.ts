import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type SystemState = {
  toasts: {id: number; content: string}[];
};

const initialState: SystemState = {
  toasts: [],
};

let toastIndex = 0;

const systemSlice = createSlice({
  name: 'system',
  initialState,
  reducers: {
    unshiftToast: (state, {payload}: PayloadAction<string>) => {
      state.toasts.unshift({id: toastIndex++, content: payload});
    },
    removeToast: (state, {payload}: PayloadAction<number>) => {
      if (state.toasts.length === 0) {
        return state;
      } else if (state.toasts[state.toasts.length - 1].id === payload) {
        state.toasts.pop();
      } else {
        state.toasts = state.toasts.filter(toast => toast.id !== payload);
      }
    },
  },
});

export const {unshiftToast, removeToast} = systemSlice.actions;

export default systemSlice.reducer;
