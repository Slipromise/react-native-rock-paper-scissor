import React from 'react';
import {ListItem} from '@rneui/themed';
import useStyles from '../styles/gamelist';

type Props = {
  title: string;
  playerCount?: number;
  winner?: string;
  onPress?: () => void;
  isDone?: boolean;
};

// TODO: icon 處理
const GameListItem = ({title, playerCount, winner, onPress, isDone}: Props) => {
  const styles = useStyles({isDone: isDone});

  return (
    <ListItem onPress={onPress} containerStyle={styles.container}>
      <ListItem.Content>
        <ListItem.Title style={styles.title}>{title}</ListItem.Title>
        <ListItem.Subtitle style={styles.subtitle}>
          {winner
            ? `恭喜${winner}勝出`
            : playerCount
            ? `${playerCount}位玩家正在遊玩`
            : '正在等待玩家參與'}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  );
};

export default GameListItem;
