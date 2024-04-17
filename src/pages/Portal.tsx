import {View} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '@rneui/themed';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useDispatch} from 'react-redux';
import {
  createGame,
  joinGame,
  restartGame,
  revealGame,
  setDisplayName,
  signInAnonymously,
} from '../store/actions';
import {AppDispatch} from '../store';
type Props = {};

const Portal = ({}: Props) => {
  const [nickname, setNickname] = useState(() => '');

  const dispatch = useDispatch<AppDispatch>();

  return (
    <View>
      <Input
        label="暱稱"
        placeholder="輸入你的新暱稱"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button
        title="user"
        onPress={() => {
          dispatch(signInAnonymously());
        }}
      />
      <Button
        title="進入"
        onPress={() => {
          dispatch(setDisplayName('test2'));
        }}
      />
      <Button
        title="建造新遊戲"
        onPress={() => {
          dispatch(createGame('Win to 20 U'));
        }}
      />
      <Button
        title="加入遊戲"
        onPress={() => {
          dispatch(joinGame('XySNddcIxtNU76keyyy7', 'Paper'));
        }}
      />
      <Button
        title="重新遊戲"
        onPress={() => {
          dispatch(restartGame('XySNddcIxtNU76keyyy7'));
        }}
      />
      <Button
        title="revealGame"
        onPress={() => {
          dispatch(revealGame('XySNddcIxtNU76keyyy7'));
        }}
      />
    </View>
  );
};

export default Portal;
