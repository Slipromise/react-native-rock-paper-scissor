import {useDispatch, useSelector} from 'react-redux';
import {AppDispatch} from '../store';
import {useEffect} from 'react';
import {setCurrentGame} from '../store/gameSlice';
import firestore from '@react-native-firebase/firestore';
import {gameSelector} from '../store/selectors';

const useGameQuery = (id: string) => {
  const dispatch = useDispatch<AppDispatch>();

  const result = useSelector(gameSelector);

  //   TODO: 專注取消訂閱
  useEffect(() => {
    const subscriber = firestore()
      .collection('games')
      .doc(id)
      .onSnapshot(docSnapshot => {
        const data = docSnapshot.data();

        dispatch(
          setCurrentGame({...data, id} as Parameters<typeof setCurrentGame>[0]),
        );
      });
    return () => {
      subscriber();
    };
  }, [dispatch, id]);

  return result;
};

export default useGameQuery;
