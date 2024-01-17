import { StyleSheet, Text, View } from 'react-native'
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from 'react'
import MainStack from './main.stack';

const Stack = createNativeStackNavigator();

const ListStack = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen name="MainStack" component={MainStack} />
    </Stack.Navigator>
  );
};

export default ListStack;