import React, {useEffect, useRef} from 'react';
import {ListItem} from '@rneui/themed';
import LottieView from 'lottie-react-native';
import {Animated, Easing} from 'react-native';
type Props = {
  nickname: string;
  card: 'Secret' | 'Rock' | 'Paper' | 'Scissor';
};

const animation = require('../images/Animation - 1713198851570.json');

const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const PlayerListItem = ({nickname}: Props) => {
  //   const animationProgress = useRef(new Animated.Value(18 / 60));

  //   useEffect(() => {
  //     Animated.loop(
  //       Animated.timing(animationProgress.current, {
  //         toValue: 38 / 60,
  //         duration: 1000,
  //         easing: Easing.linear,
  //         useNativeDriver: false,
  //       }),
  //     ).start();
  //   }, []);

  return (
    <ListItem>
      <ListItem.Title>{nickname}</ListItem.Title>
      <LottieView
        source={animation}
        style={{width: 50, height: 50}}
        speed={2}
        autoPlay
        loop
        // progress={animationProgress.current}
      />
    </ListItem>
  );
};

export default PlayerListItem;
