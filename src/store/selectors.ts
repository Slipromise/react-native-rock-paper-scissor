import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '.';

export const userDisplayNameSelector = (state: RootState) =>
  state.user.displayName;

export const userUidSelector = (state: RootState) => state.user.uid;

const gamesSelector = (state: RootState) => state.game.games;

const currentGameSelector = (state: RootState) => state.game.currentGame;

export const gameListSelector = createSelector(
  [gamesSelector, userUidSelector],
  (games, uid) =>
    [...(games || [])]
      ?.sort((a, b) =>
        a.status === 'Done' && b.status === 'Done'
          ? 0
          : a.status === 'Done'
          ? -1
          : 1,
      )
      .map(game => ({
        ...game,
        players: game.players?.map(item => ({
          item,
          card: uid === item.uid ? item.card : 'Secret',
          displayName: uid === item.uid ? '你' : item.displayName,
        })),
      })) || [],
);

export const gameSelector = createSelector(
  [currentGameSelector, userUidSelector],
  (game, uid) => ({
    ...game,
    players: game?.players?.map(item => ({
      ...item,
      displayName: uid === item.uid ? '你' : item.displayName,
      card: uid === item.uid || game.status !== 'Doing' ? item.card : 'Secret',
    })),
  }),
);

export const waitToEnterGameIdSelector = (state: RootState) =>
  state.game.waitToEnterGameId;

export const toastsSelector = (state: RootState) => state.system.toasts;
