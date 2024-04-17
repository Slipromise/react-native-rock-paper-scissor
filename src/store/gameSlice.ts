import {PayloadAction, createSlice} from '@reduxjs/toolkit';

type Game = {
  title: string;
  id: string;
  status: 'Doing' | 'No Results' | 'Done';
  createdBy: string;
  players?: {uid: string; card: string; displayName: string}[];
  winners?: [];
  winnerCard?: string;
};

type State = {
  games?: Game[];
  currentGame?: Game;
  waitToEnterGameId?: string;
};

const initialState: State = {};

const gameSlice = createSlice({
  name: 'firestore',
  initialState,
  reducers: {
    setGames: (state, action: PayloadAction<Game[]>) => {
      const games = action.payload;
      state.games = games;
    },
    setCurrentGame: (state, action: PayloadAction<Game>) => {
      const currentGame = action.payload;
      state.currentGame = currentGame;
    },
    setWaitToEnterGameId: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      const waitToEnterGameId = action.payload;
      state.waitToEnterGameId = waitToEnterGameId;
    },
  },
});

export const {setGames, setCurrentGame, setWaitToEnterGameId} =
  gameSlice.actions;

export default gameSlice.reducer;
