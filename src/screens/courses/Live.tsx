import {useStoreState} from 'easy-peasy';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  SafeAreaView,
  StatusBar,
  View,
  Image,
  Button,
} from 'react-native';
import Icon from 'react-native-dynamic-vector-icons';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {streamsApi} from '../../api/streamsApi';
import {screens} from '../../libs/screens';
import {baseUrl} from '../../libs/vars';
import {Title} from '../../styled/Title';
// import AccessDenied from './AccessDenied';

export default function Live({route, navigation}: any) {
  const theme: any = useTheme();

  const {selectedCourseId} = useStoreState((state) => state.home);

  const {data: streams, isLoading}: any = useQuery(
    ['streams', selectedCourseId],
    streamsApi,
    {
      retry: false,
    },
  );

  if (isLoading) {
    return <ActivityIndicator style={{flex: 1, justifyContent: 'center'}} />;
  }

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
          <Button
            title="test"
            onPress={() => {
              return navigation.push(screens.YTPlayer.name, {
                video: {video_id: '-LFUpB59xS8'},
              });
            }}
          />
          <FlatList
            style={{padding: 5}}
            keyExtractor={(_, index) => index.toString()}
            data={streams}
            ListEmptyComponent={() => (
              <Title color="#fff" pl="10px" fontSize="18px">
                No streams yet
              </Title>
            )}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    backgroundColor: '#eee',
                    margin: 5,
                    padding: 10,
                    elevation: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    return navigation.push(screens.YTPlayer.name, {
                      video: item,
                    });
                  }}>
                  <View
                    style={{
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
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

                    <View style={{justifyContent: 'center'}}>
                      <Icon
                        type="MaterialCommunityIcons"
                        name="video"
                        color={item.is_live ? 'red' : 'black'}
                        size={32}
                      />
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
