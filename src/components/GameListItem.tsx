import React from 'react';
import {ListItem} from '@rneui/themed';

type Props = {
  title: string;
  playerCount?: number;
  winner?: string;
};

const GameListItem = ({title, playerCount, winner}: Props) => {
  return (
    <ListItem>
      <ListItem.Content>
        <ListItem.Title>{title}</ListItem.Title>
        <ListItem.Subtitle>
          {winner ? `恭喜${winner}勝出` : `正在參與遊玩${playerCount}`}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default GameListItem;
