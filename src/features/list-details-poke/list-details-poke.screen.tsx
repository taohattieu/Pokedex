import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Alert,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {Bar} from 'react-native-progress';

const DetailsPoke = () => {
  const navigation = useNavigation<any>();
  const route = useRoute();
  const [PokeDetails, setPokeDetails] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(route.params.id);
  const [speciesDetails, setSpeciesDetails] = useState<string | null>(null);

  const fetchPokeDetails = async (id: number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${id}`,
      );
      const data = response.data;

      const moves = data.moves.slice(0, 2).map((move: any) => move.move.name);
      setPokeDetails({
        id: data.id,
        name: data.name,
        moves,
        types: data.types.map((type: any) => type.type.name),
        weight: data.weight,
        height: data.height,
        sprites: {
          front_default: data.sprites.other['official-artwork'].front_default,
        },
        baseStats: {
          HP: data.stats[0].base_stat,
          ATK: data.stats[1].base_stat,
          DEF: data.stats[2].base_stat,
          SATK: data.stats[3].base_stat,
          SDEF: data.stats[4].base_stat,
          SPD: data.stats[5].base_stat,
        },
      });
    } catch (error) {
      console.log('err', error);
      Alert.alert('Error', 'Undefined');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSpeciesDetails = async (id: number) => {
    try {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`,
      );
      const data = response.data;
      const flavorText = data.flavor_text_entries
        .filter((entry: any) => entry.language.name === 'en')[0]
        ?.flavor_text.replace(/\n/g, ' ');
      setSpeciesDetails(flavorText);
    } catch (error) {
      console.log('err', error);
    }
  };

  useEffect(() => {
    fetchPokeDetails(currentIndex);
    fetchSpeciesDetails(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    const nextIndex = currentIndex + 1;
    setCurrentIndex(nextIndex);
  };

  const handleBack = () => {
    const prevIndex = currentIndex - 1;
    setCurrentIndex(prevIndex);
  };

  const getTypeColor = (type: string): string => {
    switch (type) {
      case 'normal':
        return '#A8A878';
      case 'fighting':
        return '#C03028';
      case 'flying':
        return '#A890F0';
      case 'poison':
        return '#A040A0';
      case 'ground':
        return '#CC9966';
      case 'rock':
        return '#b69e31';
      case 'bug':
        return '#a7b723';
      case 'ghost':
        return '#70559b';
      case 'steel':
        return '#b7b9d0';
      case 'fire':
        return '#f57d31';
      case 'water':
        return '#6493eb';
      case 'grass':
        return '#74cb48';
      case 'electric':
        return '#f9cf30';
      case 'psychic':
        return '#fb5584';
      case 'ice':
        return '#CCCCCC';
      case 'dragon':
        return '#CC0000';
      case 'dark':
        return '#999999';
      case 'fairy':
        return '#FFCCCC';
      default:
        return '#B8B8D0';
    }
  };

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#dc0a2d" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View
          style={{
            flex: 1,
            backgroundColor: getTypeColor(PokeDetails?.types[0]),
          }}>
          <View style={{flexDirection: 'row', flex: 0.5}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrowleft"
                size={25}
                style={{
                  color: '#fff',
                  marginVertical: 16,
                  marginHorizontal: 16,
                }}
              />
            </TouchableOpacity>
            <View
              style={{
                marginVertical: 16,
                marginLeft: 100,
                width: 200,
                height: 200,
              }}>
              <Image source={require('../../pics/pokeballs.png')} />
              <View style={{bottom: 125, right: 60}}>
                <Image
                  source={{
                    uri: PokeDetails?.sprites.front_default,
                  }}
                  style={{width: 200, height: 200}}
                />
              </View>
            </View>

            <Text
              style={{
                position: 'absolute',
                textTransform: 'capitalize',
                marginHorizontal: 50,
                marginVertical: 10,
                fontSize: 25,
                color: '#fff',
              }}>
              {PokeDetails?.name}
            </Text>
            <Text
              style={{
                marginVertical: 10,
                color: '#fff',
                fontSize: 25,
                right: 20,
              }}>
              #{PokeDetails?.id}
            </Text>
            <View style={{right: 350, marginTop: 200}}>
              <TouchableOpacity onPress={handleBack}>
                <Icon name="left" size={30} style={{color: '#ffffff'}} />
              </TouchableOpacity>
            </View>
            <View style={{right: 100, marginTop: 200}}>
              <TouchableOpacity onPress={handleNext}>
                <Icon name="right" size={30} style={{color: '#ffffff'}} />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              marginHorizontal: 10,
              marginTop: -50,
              marginBottom: 10,
              zIndex: -1,
            }}>
            <View
              style={{
                alignItems: 'center',
              }}>
              <View style={{flexDirection: 'row'}}>
                {PokeDetails?.types?.map((p: string) => (
                  <Text
                    key={p}
                    style={{
                      marginTop: 60,
                      marginHorizontal: 10,
                      textTransform: 'capitalize',
                      fontWeight: 'bold',
                      borderRadius: 15,
                      backgroundColor: getTypeColor(p),
                      textAlign: 'center',
                      textAlignVertical: 'center',
                      width: 70,
                      height: 25,
                    }}>
                    {p}
                  </Text>
                ))}
              </View>

              <Text
                style={{
                  fontSize: 20,
                  color: getTypeColor(PokeDetails?.types[0]),
                  fontWeight: 'bold',
                  marginVertical: 20,
                }}>
                About:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 10,
                  marginBottom: 20,
                }}>
                <View style={{flex: 1}}>
                  <Image
                    style={{left: 20, top: 2}}
                    source={require('../../pics/weight.png')}
                  />
                  <View style={{position: 'absolute', alignSelf: 'center'}}>
                    <Text>{PokeDetails?.weight / 10} kg</Text>
                  </View>
                  <Text></Text>
                  <Text style={{alignSelf: 'center'}}>Weight</Text>
                </View>
                <Image source={require('../../pics/divider.png')} />
                <View style={{flex: 1}}>
                  <Image
                    style={{left: 20, top: 2}}
                    source={require('../../pics/straighten.png')}
                  />
                  <View style={{position: 'absolute', alignSelf: 'center'}}>
                    <Text>{PokeDetails?.height / 10} m</Text>
                  </View>
                  <Text></Text>
                  <Text style={{alignSelf: 'center'}}>Height</Text>
                </View>
                <Image source={require('../../pics/divider.png')} />
                <View style={{marginLeft: 20, flex: 1}}>
                  <View style={{alignSelf: 'center'}}>
                    <Text>{PokeDetails?.moves.join('\n')}</Text>
                  </View>
                  <Text style={{alignSelf: 'center'}}>Moves</Text>
                </View>
              </View>

              <ScrollView
                style={{width: '100%', height: 60, marginVertical: 16}}>
                <Text style={{marginHorizontal: 16, marginVertical: 10}}>
                  {speciesDetails}
                </Text>
              </ScrollView>

              <Text
                style={{
                  fontSize: 20,
                  color: getTypeColor(PokeDetails?.types[0]),
                  fontWeight: 'bold',
                  marginTop: 20,
                }}>
                Base Stats:
              </Text>
              <View style={{marginTop: 10}}>
                {Object.entries(PokeDetails?.baseStats || {}).map(
                  ([stat, value]) => (
                    <View
                      key={stat}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginBottom: 8,
                      }}>
                      <Text>{`${stat}: ${String(value).padStart(
                        3,
                        '0',
                      )}`}</Text>
                      <Bar
                        progress={value / 250}
                        width={270}
                        height={10}
                        color={getTypeColor(PokeDetails?.types[0])}
                        style={{alignSelf: 'flex-start', top: 5, left: 8}}
                      />
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsPoke;
