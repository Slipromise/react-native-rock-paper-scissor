import {Text} from 'react-native';
import React from 'react';
import Animated, {FadeInDown, FadeOutUp, Layout} from 'react-native-reanimated';
import styles from '../styles/toast';
import {useTimeoutFn} from 'react-use';

type Props = {
  content: string;
  onEnd: () => void;
} & typeof defaultProps;

const defaultProps = {
  duration: 900,
};

const Toast = ({content, duration, onEnd}: Props) => {
  useTimeoutFn(onEnd, duration);
  return (
    <Animated.View
      entering={FadeInDown}
      exiting={FadeOutUp}
      layout={Layout}
      style={styles.container}>
      <Text style={styles.text}>{content}</Text>
    </Animated.View>
  );
};

Toast.defaultProps = defaultProps;

export default Toast;
