import React, {memo} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {useQuery} from 'react-query';
import {axiosInstance} from 'src/libs/httpClient';

export const Countries = memo(() => {
  const {data: countries, status} = useQuery('countries', async () => {
    const res = await axiosInstance.get(
      'https://api.sarthiacademy.in/api/countries',
    );

    return res.data.countries;
  });

  if (status === 'loading') {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {countries.map((country: any) => {
        return (
          <View>
            <Text>{country.name}</Text>
          </View>
        );
      })}
    </View>
  );
});
