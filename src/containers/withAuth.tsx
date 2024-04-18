import React, {ComponentType} from 'react';
import {useSelector} from 'react-redux';
import {userUidSelector} from '../store/selectors';
import {SafeAreaView} from 'react-native';
import {Text} from '@rneui/themed';
import useAuth from './useAuth';

type withAuthProps = {};

const withAuth = <Props extends withAuthProps>(
  BaseComponent: ComponentType<Props>,
) => {
  const displayName =
    BaseComponent.displayName || BaseComponent.name || 'Component';

  const ComponentWithAuth = (prop: Props) => {
    useAuth();
    const userId = useSelector(userUidSelector);
    if (userId) {
      return <BaseComponent {...prop} />;
    }
    return (
      <SafeAreaView>
        <Text>驗證中</Text>
      </SafeAreaView>
    );
  };
  ComponentWithAuth.displayName = `withAuth(${displayName})`;
  return ComponentWithAuth;
};

export default withAuth;
