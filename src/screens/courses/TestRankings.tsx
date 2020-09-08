import React from 'react';
import {FlatList, Image, SafeAreaView, StatusBar, View} from 'react-native';
import {useTheme} from 'styled-components';
import {baseUrl} from '../../libs/vars';
import {Title} from '../../styled/Title';

export default function TestRankings({route, navigation}: any) {
  const theme = useTheme();

  const {test} = route.params;

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.backgroundColor.primary}
      />

      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: theme.backgroundColor.primary,
        }}>
        <View style={{flex: 1, padding: 5}}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={test.participants}
            renderItem={({item}) => {
              return (
                <View
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: `${baseUrl}/storage/${item.user.avatar}`,
                      }}
                      style={{
                        width: 50,
                        height: 50,
                        borderRadius: 50,
                        backgroundColor: theme.backgroundColor.primary,
                      }}
                    />
                  </View>
                  <View style={{flex: 1, marginLeft: 20}}>
                    <Title style={{fontSize: 22, fontWeight: 'bold'}}>
                      {item.user.name}
                    </Title>
                    <Title
                      style={{fontSize: 14, fontWeight: 'normal'}}
                      numberOfLines={1}>
                      {item.user.city}
                    </Title>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Title style={{fontSize: 18, fontWeight: 'bold'}}>
                      {item.points}
                    </Title>
                    <Title style={{fontSize: 14, fontWeight: 'normal'}}>
                      {item.points > 1 ? 'points' : 'point'}
                    </Title>
                  </View>
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
