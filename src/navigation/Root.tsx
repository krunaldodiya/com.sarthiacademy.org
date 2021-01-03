import {DrawerActions, NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useStoreActions, useStoreState} from 'easy-peasy';
import React, {useEffect} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import RNBackgroundDownloader from 'react-native-background-downloader';
import Icon from 'react-native-dynamic-vector-icons';
import {useQuery} from 'react-query';
import {useTheme} from 'styled-components';
import {authUserApi} from '../api/authUserApi';
import {updateDownload} from '../libs/download';
import {getMediaFile} from '../libs/media';
import {screens} from '../libs/screens';
import Chapters from '../screens/courses/Chapters';
import StartTest from '../screens/courses/StartTest';
import VideoPlayer from '../screens/courses/VideoPlayer';
import Videos from '../screens/courses/Videos';
import ViewPdf from '../screens/courses/ViewPdf';
import YTPlayer from '../screens/courses/YTPlayer';
import EditProfile from '../screens/EditProfile';
import Feedback from '../screens/Feedback';
import InvalidDevice from '../screens/InvalidDevice';
import NotificationInfo from '../screens/NotificationInfo';
import Notifications from '../screens/Notifications';
import RequestOtp from '../screens/RequestOtp';
import SubscribeCourse from '../screens/SubscribeCourse';
import VerifyOtp from '../screens/VerifyOtp';
import CourseTabs from './CourseTabs';
import HomeTabNavigator from './HomeTabNavigator';
import ViewTestNavigator from './ViewTestNavigator';

function RootStackNavigator(props: any) {
  const theme = useTheme();

  const RootStack = createStackNavigator();

  const {data: authUser, status}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  const {initialScreen} = useStoreState((state) => state.home);
  const {files} = useStoreState((state) => state.download);

  const downloadActions: any = useStoreActions((actions) => actions.download);

  useEffect(() => {
    RNBackgroundDownloader.checkForExistingDownloads().then((tasks: any) => {
      for (let task of tasks) {
        if (files[task.id] && files[task.id].state === 'DOWNLOADING') {
          task.resume();
        }

        updateDownload(task, downloadActions);
      }
    });
  }, [downloadActions, files]);

  if (status === 'loading') {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={initialScreen}>
        <RootStack.Screen
          name={screens.RequestOtp.name}
          component={RequestOtp}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.VerifyOtp.name}
          component={VerifyOtp}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.HomeTabNavigator.name}
          component={HomeTabNavigator}
          options={({navigation}: any) => {
            return {
              headerStyle: {
                backgroundColor: theme.backgroundColor.primary,
              },
              headerTitleStyle: {
                color: '#fff',
                textTransform: 'uppercase',
              },
              headerTitle: 'Courses',
              headerTitleAlign: 'center',
              headerLeft: () => (
                <Icon
                  type="MaterialCommunity"
                  name="menu"
                  color="#fff"
                  size={22}
                  onPress={() =>
                    navigation.dispatch(DrawerActions.openDrawer())
                  }
                  style={{margin: 20}}
                />
              ),
              headerRight: () => (
                <TouchableOpacity
                  style={{margin: 20}}
                  onPress={() => navigation.push(screens.EditProfile.name)}>
                  <Image
                    style={{width: 25, height: 25, borderRadius: 25}}
                    source={{uri: getMediaFile('avatar', authUser?.avatar)}}
                  />
                </TouchableOpacity>
              ),
            };
          }}
        />

        <RootStack.Screen
          name={screens.CourseTabs.name}
          component={CourseTabs}
          options={(props: any) => {
            const index = props.route.state ? props.route.state.index : 0;
            const names = [
              'Subjects',
              'Downloads',
              'Tests',
              'Attachments',
              'Live',
            ];

            return {
              headerTintColor: theme.color.primary,
              headerTitle: names[index],
              headerTitleStyle: {color: theme.color.primary},
              headerStyle: {
                backgroundColor: theme.backgroundColor.primary,
              },
            };
          }}
        />

        <RootStack.Screen
          name={screens.ViewTestNavigator.name}
          component={ViewTestNavigator}
          options={({route}) => {
            return {
              headerTintColor: theme.color.primary,
              headerTitle: 'View Test',
              headerTitleStyle: {color: theme.color.primary},
              headerStyle: {
                backgroundColor: theme.backgroundColor.primary,
              },
            };
          }}
        />

        <RootStack.Screen
          name={screens.SubscribeCourse.name}
          component={SubscribeCourse}
          options={{
            headerTintColor: theme.color.primary,
            headerTitle: 'Subscribe Course',
            headerTitleStyle: {color: theme.color.primary},
            headerStyle: {
              backgroundColor: theme.backgroundColor.primary,
            },
          }}
        />

        <RootStack.Screen
          name={screens.EditProfile.name}
          component={EditProfile}
          options={{
            headerTitleAlign: 'center',
            headerTintColor: theme.color.primary,
            headerTitle: 'Edit Profile',
            headerTitleStyle: {color: theme.color.primary},
            headerStyle: {
              backgroundColor: theme.backgroundColor.primary,
            },
          }}
        />

        <RootStack.Screen
          name="InvalidDevice"
          component={InvalidDevice}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.Chapters.name}
          component={Chapters}
          options={({route}) => {
            return {
              headerTintColor: theme.color.primary,
              headerTitle: route.params.subject.name,
              headerTitleStyle: {color: theme.color.primary},
              headerStyle: {
                backgroundColor: theme.backgroundColor.primary,
              },
            };
          }}
        />

        <RootStack.Screen
          name={screens.Videos.name}
          component={Videos}
          options={({route}) => {
            return {
              headerTintColor: theme.color.primary,
              headerTitle: route.params.chapter.name,
              headerTitleStyle: {color: theme.color.primary},
              headerStyle: {
                backgroundColor: theme.backgroundColor.primary,
              },
            };
          }}
        />

        <RootStack.Screen name={screens.Feedback.name} component={Feedback} />

        <RootStack.Screen
          name={screens.Notifications.name}
          component={Notifications}
        />

        <RootStack.Screen
          name={screens.NotificationInfo.name}
          component={NotificationInfo}
        />

        <RootStack.Screen
          name={screens.StartTest.name}
          component={StartTest}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.ViewPdf.name}
          component={ViewPdf}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.YTPlayer.name}
          component={YTPlayer}
          options={{header: () => null}}
        />

        <RootStack.Screen
          name={screens.VideoPlayer.name}
          component={VideoPlayer}
          options={{header: () => null}}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default RootStackNavigator;
