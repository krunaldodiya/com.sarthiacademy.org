import {useStoreActions} from 'easy-peasy';
import moment from 'moment';
import React, {memo} from 'react';
import {
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
import {screens} from '../libs/screens';
import {baseUrl} from '../libs/vars';
import {Title} from '../styled/Title';

function MyCourses({navigation}: any) {
  const theme: any = useTheme();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const {setSelectedCourseId} = useStoreActions((actions) => actions.home);

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
            data={authUser?.subscriptions}
            ListEmptyComponent={() => (
              <Title color="#fff" pl="10px" fontSize="18px">
                No subscriptions yet.
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
                    padding: 5,
                    elevation: 5,
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    setSelectedCourseId(item.plan.course.id);
                    navigation.push(screens.CourseTabNavigator.name);
                  }}>
                  <View>
                    <Image
                      source={{
                        uri: `${baseUrl}/storage/${item.plan.course.image}`,
                      }}
                      style={{width: 80, height: 80}}
                    />
                  </View>

                  <View style={{flex: 1, marginHorizontal: 10}}>
                    <View>
                      <Title color="#000" fontSize={22} numberOfLines={1}>
                        {item.plan.course.name}
                      </Title>

                      <Title
                        color={item.status === 'Active' ? 'green' : 'red'}
                        fontSize={16}>
                        Status : {item.status}
                      </Title>

                      <Title color="red" fontSize={16}>
                        Expiry : {moment(item.expires_at).format('DD-MM-YYYY')}
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

export default memo(MyCourses);
