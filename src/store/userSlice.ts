import {createSlice} from '@reduxjs/toolkit';

type state = {
  nickname?: string;
  id?: string;
};

const initialState: state = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

export const {} = userSlice.actions;

export default userSlice.reducer;
