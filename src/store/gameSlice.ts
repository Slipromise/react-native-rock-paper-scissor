import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type State = {
  games?: {
    id: string;
    status: 'Doing' | 'No Results' | 'Done';
    createdBy: string;
    players?: {uid: string; card: string; nickname: string}[];
    winners?: [];
  }[];
};

const initialState: State = {};

const gameSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<State['games']>) => {
      const games = action.payload;
      state.games = games;
    },
  },
});

export const {setGames} = gameSlice.actions;

export default gameSlice.reducer;
