import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {setGames} from '../store/gameSlice';
import {gameListSelector} from '../store/selectors';
import {useIsFocused} from '@react-navigation/native';

const useGameListQuery = () => {
  const dispatch = useDispatch<AppDispatch>();

  const result = useSelector(gameListSelector);

  const isFocuser = useIsFocused();

  useEffect(() => {
    const subscriber = isFocuser
      ? firestore()
          .collection('games')
          .onSnapshot(docSnapshot => {
            dispatch(
              setGames(
                docSnapshot.docs.map(item => ({
                  id: item.id,
                  ...item.data(),
                })) as Parameters<typeof setGames>[0],
              ),
            );
          })
      : undefined;
    return () => {
      subscriber && subscriber();
    };
  }, [dispatch, isFocuser]);

  return result;
};

export default useGameListQuery;
