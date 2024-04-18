import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Toast from '../components/Toast';
import {removeToast} from '../store/systemSlice';
import Animated from 'react-native-reanimated';
import styles from '../styles/toasts';
import {toastsSelector} from '../store/selectors';

type Props = {};

const Toasts = ({}: Props) => {
  const toasts = useSelector(toastsSelector);
  const dispatch = useDispatch();

  return (
    <Animated.FlatList
      data={toasts}
      renderItem={({item}) => (
        <Toast
          content={item.content}
          onEnd={() => dispatch(removeToast(item.id))}
        />
      )}
      keyExtractor={({id}) => id.toString()}
      style={styles.container}
      inverted
      pointerEvents="none"
    />
  );
};

export default Toasts;
