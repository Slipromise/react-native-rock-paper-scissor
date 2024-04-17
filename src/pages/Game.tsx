import {FlatList, StyleSheet, View} from 'react-native';
import React, {ComponentProps, useCallback, useEffect, useMemo} from 'react';
import PlayerListItem from '../components/PlayerListItem';
import {RootStackNames, RootStackParamList} from '../definitions/Navigation';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import useGameQuery from '../containers/useGameQuery';
import {Button, ButtonGroup} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {userUidSelector} from '../store/selectors';
import {AppDispatch} from '../store';
import {joinGame, restartGame, revealGame} from '../store/actions';
import LottieView from 'lottie-react-native';

type Props = NativeStackScreenProps<RootStackParamList, RootStackNames.GAME>;

const animation = require('../images/Animation - 1713361770020.json');

const Game = ({route, navigation}: Props) => {
  const data = useGameQuery(route.params.id);

  const dispatch = useDispatch<AppDispatch>();

  const userId = useSelector(userUidSelector);

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
    <View style={StyleSheet.absoluteFill}>
      {/* TODO: 勝利動畫 */}
      {/* <LottieView
        source={animation}
        style={{width: '100%', height: '100%', position: 'absolute'}}
        autoPlay
        loop
      /> */}
      <FlatList
        data={data.players}
        renderItem={({item}) => (
          <PlayerListItem
            nickname={item.displayName}
            card={item.card as ComponentProps<typeof PlayerListItem>['card']}
          />
        )}
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
