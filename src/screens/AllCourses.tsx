import React, {memo} from 'react';
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
import {authUserApi} from '../api/authUserApi';
import {coursesApi} from '../api/coursesApi';
import {screens} from '../libs/screens';
import {baseUrl} from '../libs/vars';
import {Title} from '../styled/Title';

function AllCourses({navigation}: any) {
  const theme: any = useTheme();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const {data: courses, isLoading}: any = useQuery('courses', coursesApi, {
    retry: false,
  });

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
        <View style={{flex: 1, padding: 10}}>
          <FlatList
            keyExtractor={(_, index) => index.toString()}
            data={courses}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#eee',
                    margin: 5,
                    padding: 5,
                    elevation: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    navigation.push(screens.SubscribeCourse.name, {
                      course: item,
                      authUser,
                    });
                  }}>
                  <View>
                    <Image
                      source={{uri: `${baseUrl}/storage/${item.image}`}}
                      style={{width: 80, height: 80}}
                    />
                  </View>

                  <View style={{flex: 1, marginHorizontal: 10}}>
                    <View>
                      <Title color="#000" fontSize={22} numberOfLines={1}>
                        {item.name}
                      </Title>

                      <Title
                        color="#000"
                        fontSize={12}
                        mt="3px"
                        numberOfLines={1}>
                        {item.description}
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

export default memo(AllCourses);
