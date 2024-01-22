import React, {ReactNode, useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import Svg, {Circle} from 'react-native-svg';
import {Bar} from 'react-native-progress';

// interface DetailsPokeProps {
//   route: {
//     params: {
//       pokeDetails: {
//         types: any;
//         sprites: any;
//         weight: number;
//         height: number;
//         id: number;
//         moves: any;
//         name: string;
//         image: string;
//       };
//     };
//   };
// }

// interface PokeDetails {
//   id: number;
//   name: string;
//   moves: string[];
//   types: string[];
//   weight: number;
//   height: number;
//   sprites: {
//     front_default: string;
//   };
// }

const DetailsPoke = () => {
  const navigation = useNavigation<any>();
  // khoi tao useRoute
  const route = useRoute();
  // console.log(route.params)
  // const { pokeDetails } = route.params;
  const [PokeDetails, setPokeDetails] = useState<PokeDetails>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPokeDetails = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${route.params.id}`,
        );
        // console.log('api', response.data)
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
        setError('Error message');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokeDetails();
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#dc0a2d" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View style={{flex: 1, backgroundColor: '#6493eb'}}>
          <View style={{flexDirection: 'row', flex: 0.15}}>
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
                right: 20
              }}>
              #{PokeDetails?.id}
            </Text>
            <View style={{ right: 60}}>
              <TouchableOpacity>
              <Icon name='left' size={30}/>
            </TouchableOpacity>
            </View>
            <View style={{ right: 50}}>
            <TouchableOpacity>
              <Icon name='right' size={30}/>
            </TouchableOpacity>
            </View>
          </View>
          <View style={{alignItems: 'center', zIndex: 1, }}>
            <Image
              source={{
                uri: PokeDetails?.sprites.front_default,
              }}
              style={{width: 200, height: 200}}
            />
            
          </View>
          
          <View
            style={{
              flex: 1,
              backgroundColor: '#ffffff',
              borderRadius: 10,
              marginHorizontal: 10,
              marginTop: -50,
              marginBottom: 10,
            }}>
              
            <View
              style={{
                // marginHorizontal: 16,
                // marginVertical: 16,
                alignItems: 'center',
              }}>
              <Text
                style={{
                  marginTop: 50,
                  textTransform: 'capitalize',
                  fontWeight: 'bold',
                  borderRadius: 10,
                  width: 100,
                  height: 25,
                }}>
                {PokeDetails?.types.join(', ')}
              </Text>

              <Text style={{fontSize: 16, color: '#6493eb', fontWeight: 'bold', marginTop: 10}}>
                About:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  // backgroundColor: '#ff0',
                  marginTop: 10,
                }}>
                <View style={{flex: 0.8}}>
                  <Image style={{left: 8, top: 2}} source={require('../../pics/weight.png')} />
                  <View style={{position: 'absolute', alignSelf: 'center'}}>
                    <Text>{PokeDetails?.weight / 10} kg</Text>
                  </View>
                  <Text></Text>
                  <Text style={{alignSelf: 'center'}}>Weight</Text>
                </View>
                <Image source={require('../../pics/divider.png')} />
                <View style={{flex: 0.8}}>
                  <Image style={{left: 8, top: 2}} source={require('../../pics/straighten.png')} />
                  <View style={{position: 'absolute', alignSelf: 'center'}}>
                    <Text>{PokeDetails?.height / 10} m</Text>
                  </View>
                  <Text></Text>
                  <Text style={{alignSelf: 'center'}}>Height</Text>
                </View>
                <Image source={require('../../pics/divider.png')} />
                <View style={{marginLeft: 20, flex: 1.5}}>
                  <View>
                    <Text>{PokeDetails?.moves.join(',')}</Text>
                  </View>
                  <Text></Text>
                  <Text style={{alignSelf: 'center'}}>Moves</Text>
                </View>
              </View>

              <Text style={{fontSize: 16, color: '#6493eb', fontWeight: 'bold', marginTop: 10}}>
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
                      <Text>{`${stat}: ${String(value).padStart(3,'0',)}`}</Text>
                      <Bar
                        progress={value / 250}
                        width={270}
                        height={10}
                        color={'#dc0a2d'}
                        style={{alignSelf: 'flex-start'}}
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
