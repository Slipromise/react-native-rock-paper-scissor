import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackNames, RootStackParamList} from '../definitions/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import Portal from './Portal';
import GameList from './GameList';
import Game from './Game';

type Props = {};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const index = ({}: Props) => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={RootStackNames.PORTAL}>
        <RootStack.Screen
          name={RootStackNames.PORTAL}
          component={Portal}
          options={{title: '歡迎你'}}
        />
        <RootStack.Screen
          name={RootStackNames.GAME_LISTS}
          component={GameList}
          options={{title: '遊戲列表'}}
        />
        <RootStack.Screen name={RootStackNames.GAME} component={Game} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default index;
