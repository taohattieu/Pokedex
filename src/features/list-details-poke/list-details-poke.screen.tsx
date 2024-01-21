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
import Svg, { Circle } from 'react-native-svg';
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
          <View style={{flexDirection: 'row', flex: 0.5}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Icon
                name="arrowleft"
                size={25}
                style={{
                  color: '#fff',
                  marginVertical: 20,
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
                marginVertical: 16,
                fontSize: 25,
                color: '#fff',
              }}>
              {PokeDetails?.name}
            </Text>
            <Text
              style={{
                marginVertical: 16,
                color: '#fff',
                fontSize: 25,
              }}>
              #{PokeDetails?.id}
            </Text>
          </View>
          <Image
            source={{
              uri: PokeDetails?.sprites.front_default,
            }}
            style={{width: 100, height: 100}}
          />

          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
            Types:
          </Text>
          <Text>{PokeDetails?.types.join(', ')}</Text>

          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
            About:
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
            }}>
            <View>
              <Text>{`Weight: ${PokeDetails?.weight} kg`}</Text>
              <Text>{`Height: ${PokeDetails?.height} m`}</Text>
            </View>
            <View style={{marginLeft: 20}}>
              <Text style={{fontSize: 16, fontWeight: 'bold'}}>Moves:</Text>
              <Text>{PokeDetails?.moves.join(',')}</Text>
            </View>
          </View>

          <Text style={{fontSize: 16, fontWeight: 'bold', marginTop: 10}}>
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
                    marginBottom: 5,
                  }}>
                  <Text>{`${stat}: ${String(value).padStart(3, '0')}`}</Text>
                  <Bar
                  progress={value / 100} 
                  width={300} 
                  height={10} 
                  color={'#dc0a2d'} 
                  style={{ alignSelf: 'flex-start' }}
                />
                </View>
              ),
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default DetailsPoke;
