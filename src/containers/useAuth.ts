import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {AppDispatch} from '../store';
import {setInfo} from '../store/userSlice';

const useAuth = () => {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    auth()
      .signInAnonymously()
      .then(data => {
        dispatch(
          setInfo({
            uid: data.user.uid,
            displayName:
              data.user.displayName !== null
                ? data.user.displayName
                : undefined,
          }),
        );
      });
  }, [dispatch]);
};

export default useAuth;
