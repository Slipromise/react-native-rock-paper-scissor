import {FlatList, View} from 'react-native';
import React, {
  ComponentProps,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PlayerListItem from '../components/PlayerListItem';
import {RootStackNames, RootStackParamList} from '../definitions/Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useGameQuery from '../containers/useGameQuery';
import {Button, ButtonGroup, Text} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {userUidSelector} from '../store/selectors';
import {AppDispatch} from '../store';
import {joinGame, restartGame, revealGame} from '../store/actions';
import LottieView from 'lottie-react-native';
import useStyles from '../styles/game';

type Props = NativeStackScreenProps<RootStackParamList, RootStackNames.GAME>;

const winningAnimation = require('../images/Animation - 1713361770020.json');

const emptyBgAnimation = require('../images/Animation - 1713198851570.json');

const Game = ({route, navigation}: Props) => {
  const data = useGameQuery(route.params.id);

  const dispatch = useDispatch<AppDispatch>();

  const [hasShownAnimation, setHasShownAnimation] = useState(() => false);

  const userId = useSelector(userUidSelector);

  const styles = useStyles();

  useEffect(() => {
    data.title && navigation.setOptions({title: data.title});
  }, [data.title, navigation]);

  const selectedIndex = useMemo(() => {
    const item = data.players?.find(({uid}) => userId === uid);

    if (item?.card === 'Scissor') {
      return 0;
    } else if (item?.card === 'Rock') {
      return 1;
    } else if (item?.card === 'Paper') {
      return 2;
    }

    return -1;
  }, [data.players, userId]);

  const isShownAnimation = useMemo(
    () =>
      (data.status === 'Done' &&
        selectedIndex === 0 &&
        data.winnerCard === 'Scissor') ||
      (data.status === 'Done' &&
        selectedIndex === 1 &&
        data.winnerCard === 'Rock') ||
      (data.status === 'Done' &&
        selectedIndex === 2 &&
        data.winnerCard === 'Paper'),
    [data.status, data.winnerCard, selectedIndex],
  );

  const onJoin = useCallback(
    (n: number) => {
      data.id &&
        dispatch(
          joinGame(
            data.id,
            n === 0 ? 'Scissor' : n === 1 ? 'Rock' : n === 2 ? 'Paper' : '',
          ),
        );
    },
    [data.id, dispatch],
  );

  return (
    <View style={styles.container}>
      {isShownAnimation && !hasShownAnimation && (
        <LottieView
          source={winningAnimation}
          style={styles.winningAnimation}
          autoPlay
          loop={false}
          onAnimationFinish={() => setHasShownAnimation(true)}
        />
      )}
      <FlatList
        data={data.players}
        renderItem={({item}) => (
          <PlayerListItem
            nickname={item.displayName}
            card={item.card as ComponentProps<typeof PlayerListItem>['card']}
            isWinner={item.card === data.winnerCard}
          />
        )}
        ListEmptyComponent={
          <View style={styles.ListEmptyContainer}>
            <LottieView
              source={emptyBgAnimation}
              autoPlay
              loop
              style={styles.emptyBgAnimation}
            />
            <Text style={styles.emptyHintText}>等待玩家出拳</Text>
          </View>
        }
      />
      {data.createdBy === userId && data.status === 'No Results' && (
        <Button
          title="重新一局"
          onPress={() => data.id && dispatch(restartGame(data.id))}
        />
      )}
      {data.createdBy === userId &&
        data.status === 'Doing' &&
        data.players &&
        data.players.length > 1 && (
          <Button
            title="開牌"
            onPress={() => data.id && dispatch(revealGame(data.id))}
          />
        )}
      <ButtonGroup
        buttons={['剪刀', '石頭', '布']}
        selectedIndex={selectedIndex}
        onPress={onJoin}
        disabled={data.status !== 'Doing'}
      />
    </View>
  );
};

export default Game;
