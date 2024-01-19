import React, { ReactNode, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

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
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${route.params.id}`);
        console.log('api', response.data)
        const data = response.data;
        setPokeDetails({
          id: data.id,
          name: data.name,
          moves: data.moves.map((type: any) => type.move.name),
          types: data.types.map((type: any) => type.type.name),
          weight: data.weight,
          height: data.height,
          sprites: {
            front_default: data.sprites.front_default,
          },
        });
      }
      catch (error) {
        console.log('err', error)
        setError('Error message');
      } 
      finally {
        setIsLoading(false);
      }
    };

    fetchPokeDetails();
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#dc0a2d" />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>
          <Image source={{ uri: PokeDetails?.sprites.front_default }} style={{ width: 100, height: 100 }} />
          <Text>Name: {PokeDetails?.name}</Text>
          <Text>Types: {PokeDetails?.types.join(', ')}</Text>
          <Text>Weight: {PokeDetails?.weight} kg</Text>
          <Text>Height: {PokeDetails?.height} m</Text>
          <Text>Moves: {PokeDetails?.moves.join(', ')}</Text>
        </View>
      )}
    </View>
  );
};

export default DetailsPoke;
