import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import ListPoke from '../features/list-poke/list-poke.screen';
import DetailsPoke from '../features/list-details-poke/list-details-poke.screen';
import ListStack from './list.stack';
import DetailsStack from './details.stack';

const Stack = createNativeStackNavigator();

const MainStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
        <Stack.Screen name="ListPoke" component={ListPoke} />
        <Stack.Screen name="DetailsPoke" component={DetailsPoke} />
    </Stack.Navigator>
  );
};

export default MainStack;