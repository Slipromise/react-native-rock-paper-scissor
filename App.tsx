/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/store';
import Pages from './src/pages';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {ThemeProvider} from '@rneui/themed';
import theme from './src/styles/theme';
import Toasts from './src/containers/Toasts';
import withAuth from './src/containers/withAuth';

const WarpPages = withAuth(Pages);
function App(): React.JSX.Element {
  // return <Pages></Pages>;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <WarpPages />
          <Toasts />
        </ThemeProvider>
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
