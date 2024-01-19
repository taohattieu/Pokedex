import { DevSettings, NativeModules, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import ListPoke from './src/features/list-poke/list-poke.screen';
import DetailsPoke from './src/features/list-details-poke/list-details-poke.screen';
import MainStack from './src/navigators/main.stack';


const App = () => {
  useEffect(() => {
    if (__DEV__) {
      DevSettings.addMenuItem('Bật debug', () => {
        NativeModules.DevSettings.setIsDebuggingRemotely(true);
      });
    }
  }, []);
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {/* <ListPoke/> */}
        {/* <DetailsPoke/> */}
        <MainStack />
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;
