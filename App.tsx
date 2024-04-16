/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import Pages from './src/pages';
import {PersistGate} from 'redux-persist/integration/react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Text, View} from 'react-native';

function App(): React.JSX.Element {
  // return <Pages></Pages>;

  return (
    <SafeAreaProvider>
      <Provider store={store}>
        {/* <PersistGate loading={<Text>Loading</Text>} persistor={persistor}> */}
        <Pages />
        {/* </PersistGate> */}
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
