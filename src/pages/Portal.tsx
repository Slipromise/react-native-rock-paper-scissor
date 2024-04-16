import {View} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from '@rneui/themed';
type Props = {};

const Portal = ({}: Props) => {
  const [nickname, setNickname] = useState(() => '');

  return (
    <View>
      <Input
        label="暱稱"
        placeholder="輸入你的新暱稱"
        value={nickname}
        onChangeText={setNickname}
      />
      <Button title="進入" disabled={!nickname} />
    </View>
  );
};

export default Portal;
