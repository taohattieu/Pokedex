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
  Pressable,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {RadioButton} from 'react-native-paper';
import axios from 'axios';
import Search from 'react-native-vector-icons/EvilIcons';
import DetailsPoke from '../list-details-poke/list-details-poke.screen';

interface PokeProps {
  id: number;
  name: string;
  image: string;
}

const ListPoke = () => {
  const {navigate} = useNavigation<any>();
  const [pokes, setPokes] = useState<PokeProps[]>([]);
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [checkbox, setCheckBox] = useState('');

  useEffect(() => {
    axios
      .get('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1302')
      .then(response => {
        const results = response.data.results;
        const formattedPokes = results.map((poke: any, index: number) => ({
          id: index + 1,
          name: poke.name,
          image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
            index + 1
          }.png`,
        }));
        setPokes(formattedPokes);
      })
      .catch(error => {
        console.error('Error :', error);
      });
  }, []);

  const renderItem = ({item}: {item: PokeProps}) => (
    <View style={{}}>
      <TouchableOpacity
        onPress={() => {
          navigate('DetailsPoke', {id: item.id});
        }}>
        <View
          style={{
            borderRadius: 10,
            borderWidth: 0.5,
            marginVertical: 16,
            marginHorizontal: 14,
            width: 104,
            height: 115,
            backgroundColor: '#ffffff',
          }}>
          <Text
            style={{
              textAlign: 'right',
              marginRight: 10,
            }}>
            #{item.id}
          </Text>
          <Image
            source={{uri: item.image}}
            style={{
              width: 72,
              height: 72,
              marginLeft: 16,
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
              height: 50,
              zIndex: -1,
              opacity: 1,
            }}></View>
        </View>
      </TouchableOpacity>
    </View>
  );

  const filteredPokes = pokes.filter(
    poke =>
      poke.name.toLowerCase().includes(searchText.toLowerCase()) ||
      poke.id.toString().includes(searchText),
  );

  return (
    <View style={{flex: 1, backgroundColor: '#dc0a2d'}}>
      <View style={{flex: 1}}>
        <Image
          source={require('../../pics/Logo.png')}
          style={{marginVertical: 16, marginHorizontal: 16}}
        />

        <View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: '#ffffff',
                marginHorizontal: 16,
                borderRadius: 25,
              }}>
              <TextInput
                placeholder="Search"
                style={{
                  marginHorizontal: 20,
                  paddingLeft: 20,
                  backgroundColor: '#ffffff',
                }}
                value={searchText}
                onChangeText={text => setSearchText(text)}
              />
            </View>
            <Search
              name="search"
              size={30}
              style={{
                position: 'absolute',
                marginHorizontal: 16,
                marginVertical: 10,
                color: '#DC0A2D',
              }}
            />
            <View
              style={{
                borderRadius: 30,
                borderWidth: 0.5,
                backgroundColor: '#fff',
                width: 50,
                height: 50,
                marginRight: 16,
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
                    // marginVertical: 30,
                    // marginHorizontal: 30,
                    // opacity: 0.5,
                  }}>
                  <TouchableOpacity onPress={() => setModalVisible(false)}>
                    <Text
                      style={{
                        fontSize: 30,
                        color: '#ff0',
                        textAlign: 'center',
                        textAlignVertical: 'center',
                      }}>
                      C
                    </Text>
                  </TouchableOpacity>
                  <View>
                    <Text
                      style={{
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
                    <View style={{marginVertical: 15, marginHorizontal: 20}}>

                        <RadioButton
                          value="number"
                          status={
                            checkbox === 'number' ? 'checked' : 'unchecked'
                          }
                          onPress={() => setCheckBox('number')}
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
                    <View style={{marginHorizontal: 20}}>

                        <RadioButton
                          value="name"
                          status={checkbox === 'name' ? 'checked' : 'unchecked'}
                          onPress={() => setCheckBox('name')}
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
                    fontSize: 30,
                    color: '#dc0a2d',
                    textAlign: 'center',
                    textAlignVertical: 'center',
                  }}>
                  #
                </Text>
              </TouchableOpacity>
            </View>
            {/* <View>
            <TouchableOpacity
              style={{
                borderRadius: 30,
                borderWidth: 1,
                backgroundColor: '#ffffff',
                width: 50,
                height: 50,
                marginRight: 16,
              }}>
                
              <Text
                style={{
                  fontSize: 30,
                  color: '#dc0a2d',
                  textAlign: 'center',
                  textAlignVertical: 'center',
                }}>
                #
              </Text>
            </TouchableOpacity>
            </View> */}
          </View>
        </View>

        <FlatList
          data={filteredPokes}
          numColumns={3}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          style={{
            backgroundColor: '#ffffff',
            marginVertical: 16,
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        />
      </View>
    </View>
  );
};

export default ListPoke;
