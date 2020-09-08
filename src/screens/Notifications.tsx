import React, {memo} from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from 'react-native';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {notificationsApi} from '../api/notificationsApi';
import {baseUrl} from '../libs/vars';
import {screens} from '../libs/screens';

function Notifications({navigation, route}: any) {
  const theme = useTheme();

  const {
    data: notifications,
    error: notificationsError,
    status: notificationsStatus,
  }: any = useQuery('notifications', notificationsApi, {
    retry: false,
  });

  if (notificationsStatus === 'loading') {
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
          <View style={{marginVertical: 20, marginLeft: 10}}>
            <Text style={{color: '#fff', textTransform: 'uppercase'}}>
              Notifications
            </Text>
          </View>

          <View style={{marginHorizontal: 10}}>
            {!notifications.length && (
              <View>
                <Text style={{color: '#fff', fontSize: 14}}>
                  No Notifications Yet.
                </Text>
              </View>
            )}

            <FlatList
              keyExtractor={(_, index) => index.toString()}
              data={notifications}
              style={{marginBottom: 60}}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      return navigation.push(screens.NotificationInfo.name, {
                        notification: item,
                      });
                    }}
                    style={{
                      backgroundColor: '#fff',
                      padding: 10,
                      borderRadius: 5,
                      marginBottom: 5,
                    }}
                    activeOpacity={0.7}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          width: 5,
                          height: 5,
                          borderRadius: 5,
                          backgroundColor: item.read ? '#fff' : '#ff0000',
                          marginRight: 10,
                        }}
                      />
                      <View
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <Image
                          source={{
                            uri: `${baseUrl}/storage/${item.image}`,
                          }}
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40,
                            backgroundColor: theme.backgroundColor.primary,
                          }}
                        />
                      </View>
                      <View style={{flex: 1, marginHorizontal: 10}}>
                        <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                          {item.title}
                        </Text>
                        <Text
                          style={{fontSize: 14, fontWeight: 'normal'}}
                          numberOfLines={1}>
                          {item.description}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

export default memo(Notifications);
