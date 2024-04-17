import {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {setGames} from '../store/gameSlice';
import {gameListSelector} from '../store/selectors';

const useGameListQuery = () => {
  const dispatch = useDispatch<AppDispatch>();

  const result = useSelector(gameListSelector);

  //   TODO: 專注取消訂閱
  useEffect(() => {
    const subscriber = firestore()
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
      });
    return () => {
      subscriber();
    };
  }, [dispatch]);

  return result;
};

export default useGameListQuery;
