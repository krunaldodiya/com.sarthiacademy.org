import React from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTheme} from 'styled-components';
import {screens} from '../../libs/screens';
import {baseUrl} from '../../libs/vars';
import {Title} from '../../styled/Title';

export default function Chapters({navigation, route}: any) {
  const theme: any = useTheme();

  const {subject} = route.params;

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
        <View style={{flex: 1}}>
          <View style={{marginVertical: 20, marginLeft: 10}}>
            <Title
              style={{color: '#fff', textTransform: 'uppercase'}}
              numberOfLines={1}>
              Chapters
            </Title>
          </View>

          <FlatList
            style={{padding: 5}}
            keyExtractor={(_, index) => index.toString()}
            data={subject.chapters}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    backgroundColor: '#fff',
                    padding: 10,
                    borderRadius: 5,
                    marginBottom: 5,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    navigation.push(screens.Videos.name, {
                      chapter: item,
                    });
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <View>
                      <Image
                        source={{
                          uri: `${baseUrl}/storage/${item.image}`,
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
                      <Title
                        style={{fontSize: 22, fontWeight: 'bold'}}
                        numberOfLines={1}>
                        {item.name}
                      </Title>
                      <Title
                        style={{fontSize: 14, fontWeight: 'normal'}}
                        numberOfLines={1}>
                        {item.description}
                      </Title>
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <Title style={{fontSize: 18, fontWeight: 'bold'}}>
                        {item.videos?.length}
                      </Title>
                      <Title style={{fontSize: 14, fontWeight: 'normal'}}>
                        {item.videos?.length > 1 ? 'videos' : 'video'}
                      </Title>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </SafeAreaView>
    </>
  );
}
