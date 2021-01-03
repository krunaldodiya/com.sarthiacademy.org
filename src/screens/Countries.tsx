import React, {memo, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, Text, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {axiosInstance} from '../libs/httpClient';
import {apiUrl} from '../libs/vars';

export const Countries = memo(() => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadCountries = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`${apiUrl}/countries`);

        setCountries(res.data.countries);
        setLoading(false);
      } catch (error) {
        setLoading(false);

        Alert.alert('error', JSON.stringify(error));
      }
    };

    loadCountries();
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={{flex: 1}}>
      <ScrollView>
        {countries.map((country: any) => {
          return (
            <View
              key={country.id}
              style={{padding: 10, backgroundColor: '#fff'}}>
              <Text style={{color: '#000'}}>{country.name}</Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
});
