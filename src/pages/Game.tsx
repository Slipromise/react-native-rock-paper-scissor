import {View} from 'react-native';
import React from 'react';
import PlayerListItem from '../components/PlayerListItem';

type Props = {};

const Game = ({}: Props) => {
  return (
    <View>
      <PlayerListItem nickname="John" card="Rock" />
    </View>
  );
};

export default Game;
