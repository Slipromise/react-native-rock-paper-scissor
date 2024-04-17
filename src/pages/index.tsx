import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackNames, RootStackParamList} from '../definitions/Navigation';
import {NavigationContainer} from '@react-navigation/native';
import Portal from './Portal';
import GameList from './GameList';
import Game from './Game';
import {useSelector} from 'react-redux';
import {userDisplayNameSelector} from '../store/selectors';
import useAuth from '../containers/useAuth';

type Props = {};

const RootStack = createNativeStackNavigator<RootStackParamList>();

const Index = ({}: Props) => {
  const userDisplayName = useSelector(userDisplayNameSelector);

  useAuth();

  return (
    <NavigationContainer>
      <RootStack.Navigator
        initialRouteName={
          userDisplayName ? RootStackNames.GAME_LIST : RootStackNames.PORTAL
        }>
        {!userDisplayName && (
          <RootStack.Screen
            name={RootStackNames.PORTAL}
            component={Portal}
            options={{title: '歡迎你'}}
          />
        )}
        <RootStack.Screen
          name={RootStackNames.GAME_LIST}
          component={GameList}
          options={{title: '遊戲列表'}}
        />
        <RootStack.Screen name={RootStackNames.GAME} component={Game} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Index;
