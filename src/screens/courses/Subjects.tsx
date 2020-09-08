import {useStoreState} from 'easy-peasy';
import React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {courseMaterialsApi} from '../../api/courseMaterialsApi';
import {screens} from '../../libs/screens';
import {baseUrl} from '../../libs/vars';
import {Title} from '../../styled/Title';

export default function Subjects({navigation}: any) {
  const theme: any = useTheme();

  const {selectedCourseId} = useStoreState((state) => state.home);

  const {data: subjects, isLoading}: any = useQuery(
    ['subjects', selectedCourseId],
    courseMaterialsApi,
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
          <FlatList
            style={{padding: 5}}
            keyExtractor={(_, index) => index.toString()}
            data={subjects}
            ListEmptyComponent={
              <Title color="#fff" pl="10px" fontSize="18px">
                No subjects yet
              </Title>
            }
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
                    navigation.push(screens.Chapters.name, {
                      subject: item,
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
                    </View>

                    <View style={{alignItems: 'center'}}>
                      <Title style={{fontSize: 18, fontWeight: 'bold'}}>
                        {item.chapters?.length}
                      </Title>
                      <Title style={{fontSize: 14, fontWeight: 'normal'}}>
                        {item.chapters?.length > 1 ? 'chapters' : 'chapter'}
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
