import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type State = {
  displayName?: string;
  uid?: string;
};

const initialState: State = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setInfo: (state, action: PayloadAction<State>) => {
      const {displayName, uid} = action.payload;
      state.displayName = displayName;
      state.uid = uid;
    },
  },
});

export const {setInfo} = userSlice.actions;

export default userSlice.reducer;
