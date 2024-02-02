import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import axios from 'axios';

const windowWidth = Dimensions.get('window').width;

interface PokeProps {
  id: number;
  name: string;
  image: string;
}

let offset = 0;

const ListPoke = () => {
  const {navigate} = useNavigation<any>();
  const [pokes, setPokes] = useState<PokeProps[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [sortBy, setSortBy] = useState<string>('number');
  const [checkbox, setCheckBox] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadData, setLoadData] = useState(false);

  const fetchMorePokes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`,
      );
      const newPokes = response.data.results.map(
        (poke: any, index: number) => ({
          id: index + offset + 1,
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            index + offset + 1
          }.png`,
        }),
      );
      setPokes(prevPokes => [...prevPokes, ...newPokes]);
      offset += 20;
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loadData) {
      fetchMorePokes();
      setLoadData(true);
    }
  }, [loadData]);

  const sortPokes = (pokesToSort: PokeProps[]) => {
    return pokesToSort.sort((a, b) => {
      if (sortBy === 'number') {
        return a.id - b.id;
      } else if (sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  };

  const renderItem = ({item}: {item: PokeProps}) => (
    <View style={{flex: 1 / 3}}>
      <TouchableOpacity
        onPress={() => {
          navigate('DetailsPoke', {id: item.id});
        }}>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            marginVertical: windowWidth * 0.01,
            marginHorizontal: windowWidth * 0.01,
            width: windowWidth * 0.3,
            height: windowWidth * 0.32,
            backgroundColor: '#ffffff',
          }}>
          <Text style={{textAlign: 'right', marginRight: windowWidth * 0.02}}>
            #{item.id}
          </Text>
          <Image
            source={{uri: item.image}}
            style={{
              width: windowWidth * 0.2,
              height: windowWidth * 0.2,
              marginLeft: windowWidth * 0.04,
            }}
          />
          <Text style={{textAlign: 'center', textTransform: 'capitalize'}}>
            {item.name}
          </Text>
          <View
            style={{
              backgroundColor: '#efefef',
              position: 'absolute',
              bottom: 0,
              borderRadius: 10,
              width: '100%',
              height: windowWidth * 0.125,
              zIndex: -1,
              opacity: 1,
            }}
          />
        </View>
      </TouchableOpacity>
    </View>
  );

  const filteredPokes = pokes.filter(
    poke =>
      poke.name.toLowerCase().includes(searchText.toLowerCase()) ||
      poke.id.toString().includes(searchText),
  );

  const sortedPokes = sortPokes(filteredPokes);

  return (
    <View style={{flex: 1, backgroundColor: '#dc0a2d'}}>
      <Image
        source={require('../../pics/Logo.png')}
        style={{
          marginVertical: windowWidth * 0.04,
          marginHorizontal: windowWidth * 0.04,
        }}
      />

      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#ffffff',
            marginHorizontal: windowWidth * 0.04,
            borderRadius: 25,
          }}>
          <TextInput
            placeholder="Search"
            style={{
              marginHorizontal: windowWidth * 0.06,
              marginVertical: windowWidth * 0.0002,
              paddingLeft: windowWidth * 0.05,
            }}
            value={searchText}
            onChangeText={text => setSearchText(text)}
          />
          <EvilIcons
            name="search"
            size={30}
            style={{
              position: 'absolute',
              marginHorizontal: windowWidth * 0.02,
              marginVertical: windowWidth * 0.02,
              color: '#DC0A2D',
            }}
          />
        </View>
        <View
          style={{
            borderRadius: 30,
            borderWidth: 0.5,
            backgroundColor: '#fff',
            width: windowWidth * 0.12,
            height: windowWidth * 0.12,
            marginRight: windowWidth * 0.04,
          }}>
          <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                  setModalVisible(!modalVisible);
                }}>
                <View
                  style={{
                    left: 170,
                    top: 60,
                    height: '23%',
                    width: '38%',
                    backgroundColor: '#dc0a2d',
                    borderRadius: 10,
                    borderWidth: 0.5,
                  }}>
                
                  <View style={{flex: 0.5}}>
                    <Text
                      style={{
                        top: 16,
                        alignSelf: 'center',
                        color: '#fff',
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Sort by:
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      backgroundColor: '#ffffff',
                      borderRadius: 10,
                      borderWidth: 0.5,
                      marginVertical: 5,
                      marginHorizontal: 5,
                    }}>
                    <View
                      style={{ marginVertical: 15, marginHorizontal: 20 }}>
                      <RadioButton
                        value="number"
                        status={
                          checkbox === 'number' ? 'checked' : 'unchecked'
                        }
                        onPress={() => {
                          setSortBy('number');
                          setCheckBox('number');
                          setModalVisible(false);
                        }}
                        color="#dc0a2d"
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          left: 40,
                          top: 8,
                          color: 'black',
                        }}>
                        Number
                      </Text>
                    </View>
                    <View style={{ marginHorizontal: 20 }}>
                      <RadioButton
                        value="name"
                        status={checkbox === 'name' ? 'checked' : 'unchecked'}
                        onPress={() => {
                          setSortBy('name');
                          setCheckBox('name');
                          setModalVisible(false);
                        }}
                        color="#dc0a2d"
                      />
                      <Text
                        style={{
                          position: 'absolute',
                          left: 40,
                          top: 8,
                          color: 'black',
                        }}>
                        Name
                      </Text>
                    </View>
                  </View>
                </View>
              </Modal>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Text
              style={{
                fontSize: windowWidth * 0.1,
                color: '#dc0a2d',
                textAlign: 'center',
                // textAlignVertical: 'center',
                bottom: 5
              }}>
              #
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredPokes}
        numColumns={3}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        style={{
          backgroundColor: '#ffffff',
          marginVertical: windowWidth * 0.04,
          marginHorizontal: windowWidth * 0.02,
          borderRadius: 10,
        }}
        onEndReached={fetchMorePokes}
      />
    </View>
  );
};

export default ListPoke;
