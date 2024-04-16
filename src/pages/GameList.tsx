import {View} from 'react-native';
import React from 'react';
import GameListItem from '../components/GameListItem';

type Props = {};

const GameList = ({}: Props) => {
  return (
    <View>
      <GameListItem title="Winner get 10 U" />
    </View>
  );
};

export default GameList;
