import React, {useEffect} from 'react';
import {Dimensions, Image, SafeAreaView, StatusBar, View} from 'react-native';
import {queryCache, useMutation} from 'react-query';
import {useTheme} from 'styled-components';
import {markAsRead} from '../api/markAsRead';
import {baseUrl} from '../libs/vars';
import {Box} from '../styled/Box';
import {Title} from '../styled/Title';

const {width} = Dimensions.get('window');

function NotificationInfo({route}: any) {
  const theme = useTheme();

  const {notification} = route.params;

  const [markNotificationAsRead] = useMutation(markAsRead, {
    onSuccess: (status) => {
      const notifications = queryCache.getQueryData('notifications');

      const notifications_updated = notifications.map((item) => {
        if (notification.id === item.id) {
          return {...item, read: true};
        }

        return item;
      });

      queryCache.setQueryData('notifications', notifications_updated);
    },
  });

  useEffect(() => {
    if (notification.read === false) {
      markNotificationAsRead({notification_id: notification.id});
    }
  }, []);

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
          <Box>
            <Image
              style={{width, height: width}}
              resizeMode="stretch"
              source={{
                uri: `${baseUrl}/storage/${notification.image}`,
              }}
            />
          </Box>

          <Box p="5px">
            <Title
              fontWeight="bold"
              fontSize={26}
              color="#fff"
              numberOfLines={1}>
              {notification.title}
            </Title>
          </Box>

          <Box p="5px">
            <Title
              fontWeight="bold"
              fontSize={16}
              color="#ddd"
              numberOfLines={1}>
              {notification.description}
            </Title>
          </Box>
        </View>
      </SafeAreaView>
    </>
  );
}

export default NotificationInfo;
