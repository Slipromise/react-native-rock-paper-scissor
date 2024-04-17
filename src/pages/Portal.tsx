import {View} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import {setDisplayName} from '../store/actions';
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
        title="進入"
        disabled={!nickname.trim()}
        onPress={() => {
          dispatch(setDisplayName(nickname));
        }}
      />
    </View>
  );
};

export default Portal;
