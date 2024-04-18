import {ThunkAction, UnknownAction} from '@reduxjs/toolkit';
import {RootState} from '.';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {setInfo} from './userSlice';
import {setWaitToEnterGameId} from './gameSlice';
import {unshiftToast} from './systemSlice';

export const signInAnonymously =
  (): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    const data = await auth().signInAnonymously();

    const {uid, displayName} = data.user;

    dispatch(
      setInfo({
        uid,
        displayName: displayName === null ? undefined : displayName,
      }),
    );
  };

export const setDisplayName =
  (displayName: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async dispatch => {
    const data = auth().currentUser;

    await data?.updateProfile({displayName});

    data && dispatch(setInfo({displayName, uid: data?.uid}));
  };

export const createGame =
  (title: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    const state = getState();

    const uid = state.user.uid;

    if (uid) {
      const doc = await firestore()
        .collection('games')
        .add({title, status: 'Doing', createdBy: uid});

      dispatch(setWaitToEnterGameId(doc.id));
    }
  };

export const joinGame =
  (
    gameId: string,
    card: string,
  ): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    const state = getState();

    const uid = state.user.uid;

    const displayName = state.user.displayName;

    if (uid) {
      const doc = await firestore().collection('games').doc(gameId).get();

      const players = doc.get('players') || [{uid, card, displayName}];

      if (Array.isArray(players)) {
        const itemIndex = players.findIndex(
          // TODO: 型別判斷
          item => (item.uid as string) === uid,
        );

        if (itemIndex === -1) {
          // TODO: 型別判斷
          players.push({uid, card, displayName});
        } else {
          players[itemIndex] = {uid, card, displayName};
        }
      }

      doc.ref.update({players});
    }
  };

export const revealGame =
  (gameId: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    const state = getState();

    const uid = state.user.uid;

    const doc = await firestore().collection('games').doc(gameId).get();

    if (
      (doc.data() as {createdBy: string}).createdBy === uid &&
      (doc.data() as {status: string}).status === 'Doing' &&
      (doc.data() as {players?: any[]}).players &&
      (doc.data() as {players: any[]}).players.length > 0
    ) {
      const players =
        (doc.data() as {players?: {card: string; displayName: string}[]})
          ?.players || [];
      const groupMap = new Map<string, string[]>();
      let hasResult = true;
      for (const {card, displayName} of players) {
        if (groupMap.has(card)) {
          groupMap.get(card)?.push(displayName);
        } else {
          groupMap.set(card, [displayName]);
        }
        if (groupMap.size >= 3) {
          hasResult = false;
          break;
        }
      }
      if (groupMap.size === 1) {
        hasResult = false;
      }

      let winners: string[] = [];
      let winnerCard: String | undefined;
      if (!hasResult) {
        winners = [];
      } else if (groupMap.has('Rock') && groupMap.has('Paper')) {
        winners = groupMap.get('Paper') as string[];
        winnerCard = 'Paper';
      } else if (groupMap.has('Rock') && groupMap.has('Scissor')) {
        winners = groupMap.get('Rock') as string[];
        winnerCard = 'Rock';
      } else if (groupMap.has('Paper') && groupMap.has('Scissor')) {
        winners = groupMap.get('Scissor') as string[];
        winnerCard = 'Scissor';
      }

      if (winners.length === 0) {
        await doc.ref.update({status: 'No Results'});
      } else {
        await doc.ref.update({status: 'Done', winners, winnerCard});
      }
    }
  };

export const restartGame =
  (gameId: string): ThunkAction<void, RootState, unknown, UnknownAction> =>
  async (dispatch, getState) => {
    const state = getState();

    const uid = state.user.uid;

    const doc = await firestore().collection('games').doc(gameId).get();

    if (
      (doc.data() as {createdBy: string}).createdBy === uid &&
      (doc.data() as {status: string}).status === 'No Results'
    ) {
      await doc.ref.update({players: [], status: 'Doing'});
    }
  };
