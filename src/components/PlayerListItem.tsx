import React, {useMemo} from 'react';
import {ListItem} from '@rneui/themed';
import LottieView from 'lottie-react-native';
import useStyles from '../styles/playerListItem';

type Props = {
  nickname: string;
  card: 'Secret' | 'Rock' | 'Paper' | 'Scissor';
  isWinner?: boolean;
};

const animation = require('../images/Animation - 1713198851570.json');

const PlayerListItem = ({nickname, card, isWinner}: Props) => {
  const isRandom = useMemo(() => card === 'Secret', [card]);
  const styles = useStyles({isWinner});

  return (
    <ListItem containerStyle={styles.container}>
      <ListItem.Title>{nickname}</ListItem.Title>
      <LottieView
        source={animation}
        style={styles.animation}
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
