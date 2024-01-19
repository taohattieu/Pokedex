import React, { useEffect, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Search from 'react-native-vector-icons/EvilIcons';
import DetailsPoke from '../list-details-poke/list-details-poke.screen';

interface PokeProps {
  id: number;
  name: string;
  image: string;
}

const ListPoke = () => {
  const { navigate } = useNavigation<any>();
  const [pokes, setPokes] = useState<PokeProps[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=95")
      .then((response) => {
        const results = response.data.results;
        const formattedPokes = results.map((poke: any, index: number) => ({
          id: index + 1,
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index + 1}.png`,
        }));
        setPokes(formattedPokes);
      })
      .catch((error) => {
        console.error("Error :", error);
      });
  }, []);

  const renderItem = ({ item }: { item: PokeProps }) => (
    <View style={{}}>
      <TouchableOpacity
      onPress={() => {
        navigate('DetailsPoke', {id: item.id})
      }}
    >
        <View style={{
          borderRadius: 10,
          borderWidth: 0.5,
          marginVertical: 16,
          marginHorizontal: 14,
          width: 104,
          height: 115,
          backgroundColor: '#ffffff'
        }}>
          <Text style={{
            textAlign: 'right',
            marginRight: 10,
          }}>#{item.id}</Text>
          <Image source={{ uri: item.image }}
            style={{
              width: 72,
              height: 72,
              marginLeft: 16,
            }} />
          <Text style={{ textAlign: 'center', textTransform: 'capitalize' }}>{item.name}</Text>
          <View
            style={{ 
              backgroundColor: '#efefef', 
              position: 'absolute',
              bottom: 0,
              borderRadius: 10,         
              width: '100%', 
              height: 50, 
              zIndex: -1,
              opacity: 1 
            }}
          ></View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: '#dc0a2d' }}>
      <View style={{ flex: 1 }}>
        <Image source={require('../../pics/Logo.png')} style={{ marginVertical: 16, marginHorizontal: 16 }} />

        <View>

          <View style={{ flexDirection: 'row' }}>
            <View style={{ flex: 1, backgroundColor: '#ffffff', marginHorizontal: 16, borderRadius: 25 }}>
              <TextInput
                placeholder='Search'
                style={{
                  marginHorizontal: 20,
                  paddingLeft: 20,
                  backgroundColor: '#ffffff',
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

        <FlatList
          data={pokes}
          numColumns={3}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          style={{
            backgroundColor: '#ffffff',
            marginVertical: 16,
            marginHorizontal: 10,
            borderRadius: 10
          }}
        />
      </View>
    </View>
  )
}

export default ListPoke;
