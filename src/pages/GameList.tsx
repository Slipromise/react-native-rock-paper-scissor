import {FlatList, StyleSheet, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import GameListItem from '../components/GameListItem';
import useGameListQuery from '../containers/useGameListQuery';
import {Button} from '@rneui/themed';
import {useDispatch, useSelector} from 'react-redux';
import {createGame} from '../store/actions';
import {AppDispatch} from '../store';
import Dialog from 'react-native-dialog';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackNames, RootStackParamList} from '../definitions/Navigation';
import {waitToEnterGameIdSelector} from '../store/selectors';
import {setWaitToEnterGameId} from '../store/gameSlice';

type Props = NativeStackScreenProps<
  RootStackParamList,
  RootStackNames.GAME_LIST
>;

const GameList = ({navigation}: Props) => {
  const data = useGameListQuery();

  const dispatch = useDispatch<AppDispatch>();

  const waitToEnterGameId = useSelector(waitToEnterGameIdSelector);

  const [newGameTitle, setNewGameTitle] = useState(() => '');

  const [showDialog, setShowDialog] = useState(() => false);

  const onCreate = useCallback(() => {
    dispatch(createGame(newGameTitle.trim()));
    setShowDialog(false);
  }, [dispatch, newGameTitle]);

  useEffect(() => {
    if (waitToEnterGameId) {
      dispatch(setWaitToEnterGameId(undefined));
      navigation.navigate(RootStackNames.GAME, {id: waitToEnterGameId});
    }
  }, [dispatch, navigation, waitToEnterGameId]);

  return (
    <View style={StyleSheet.absoluteFill}>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <GameListItem
            title={item.title}
            playerCount={item.players?.length}
            winner={item.winners?.join(',')}
            isDone={item.status === 'Done'}
            onPress={() =>
              navigation.navigate(RootStackNames.GAME, {id: item.id})
            }
          />
        )}
        keyExtractor={({id}) => id}
        // TODO: 添加空的
        // ListEmptyComponent={}
      />
      <Button
        title={'創建新遊戲'}
        onPress={() => {
          setShowDialog(true);
          setNewGameTitle('');
        }}
      />
      <Dialog.Container
        visible={showDialog}
        onBackdropPress={() => setShowDialog(false)}>
        <Dialog.Title>創建遊戲</Dialog.Title>
        <Dialog.Description>請確認以下資訊</Dialog.Description>
        <Dialog.Input
          placeholder="請輸入遊戲間名稱"
          label="遊戲間名稱"
          value={newGameTitle}
          onChangeText={setNewGameTitle}
        />
        <Dialog.Button label="取消" onPress={() => setShowDialog(false)} />
        <Dialog.Button
          label="確認"
          onPress={onCreate}
          disabled={!newGameTitle.trim()}
        />
      </Dialog.Container>
    </View>
  );
};

export default GameList;
