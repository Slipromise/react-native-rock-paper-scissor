import React, {useMemo} from 'react';
import {ListItem} from '@rneui/themed';
import LottieView from 'lottie-react-native';
// import {Animated, Easing} from 'react-native';
type Props = {
  nickname: string;
  card: 'Secret' | 'Rock' | 'Paper' | 'Scissor';
};

const animation = require('../images/Animation - 1713198851570.json');

// const AnimatedLottieView = Animated.createAnimatedComponent(LottieView);

const PlayerListItem = ({nickname, card}: Props) => {
  const isRandom = useMemo(() => card === 'Secret', [card]);

  return (
    <ListItem>
      <ListItem.Title>{nickname}</ListItem.Title>
      <LottieView
        source={animation}
        style={{width: 50, height: 50}}
        speed={!isRandom ? 0 : 2}
        autoPlay={isRandom}
        loop={isRandom}
        progress={
          !isRandom
            ? card === 'Rock'
              ? 13 / 60
              : card === 'Scissor'
              ? 33 / 60
              : card === 'Paper'
              ? 52 / 60
              : undefined
            : undefined
        }
      />
    </ListItem>
  );
};

export default PlayerListItem;
