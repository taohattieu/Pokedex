import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import ListPoke from './src/features/list-poke/list-poke.screen';


const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <ListPoke/>
      </NavigationContainer>
    </SafeAreaProvider>
  )
}

export default App;
