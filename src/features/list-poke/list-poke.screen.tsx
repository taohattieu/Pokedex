import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import DetailsPoke from '../list-details-poke/list-details-poke.screen';
import Search from 'react-native-vector-icons/EvilIcons';
import { SearchBar } from '@rneui/themed';
const ListPoke = () => {
  const { navigate } = useNavigation();
  return (
    <View style={{ flex: 1, backgroundColor: '#dc0a2d' }}>
      <View style={{ flex: 0.5, }}>
        <Image source={require('../../pics/Logo.png')} style={{ marginVertical: 16, marginHorizontal: 16 }} />

        <View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: '#ff0'}}>
            <TextInput
              placeholder='Search'
              style={{
                marginHorizontal: 20,
                paddingLeft: 20,
                backgroundColor: '#ffffff',
                flex: 0.7,
                padding: 8,
                marginTop: 10,
              }}>

            </TextInput>
            </View>
            <Search name="search" size={30}
              style={{
                position: 'absolute',
                marginHorizontal: 16,
                marginVertical: 10,
                color: '#DC0A2D'
              }} />
            <TouchableOpacity style={{
              borderRadius: 30,
              borderWidth: 1,
              backgroundColor: '#ffffff',
              width: 50,
              height: 50,
              marginRight: 16,
            }}><Text style={{ fontSize: 30, color: '#dc0a2d', textAlign: 'center', textAlignVertical: 'center' }}>#</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{
        flex: 2.7,
        backgroundColor: '#ffffff',
        marginVertical: 16,
        marginHorizontal: 8,
        borderRadius: 10
      }}>

      </View>
    </View>
  )
}

export default ListPoke;
