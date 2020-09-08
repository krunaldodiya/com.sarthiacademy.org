import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import {useTheme} from 'styled-components';
import {screens} from '../libs/screens';
import Attachments from '../screens/courses/Attachments';
import Live from '../screens/courses/Live';
import Subjects from '../screens/courses/Subjects';
import Tests from '../screens/courses/Tests';

function CourseTabNavigator({route, navigation}: any) {
  const theme = useTheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={screens.Live.name}
      tabBarOptions={{
        activeTintColor: theme.backgroundColor.primary,
        inactiveTintColor: '#bbb',
        labelStyle: {fontFamily: theme.fontFamily.QuicksandBold},
        tabStyle: {padding: 5},
        style: {height: 60, justifyContent: 'center'},
      }}>
      <Tab.Screen
        name={screens.Live.name}
        component={Live}
        options={{
          title: 'Live',
          tabBarIcon: ({color}: any) => {
            return (
              <Icon name="react" type="Fontisto" color={color} size={22} />
            );
          },
        }}
      />
      <Tab.Screen
        name={screens.Subjects.name}
        component={Subjects}
        options={{
          title: 'Subjects',
          tabBarIcon: ({color}: any) => (
            <Icon name="wallet" type="Fontisto" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Tests.name}
        component={Tests}
        options={{
          title: 'Tests',
          tabBarIcon: ({color}: any) => (
            <Icon name="md-trophy" type="Ionicons" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Attachments.name}
        component={Attachments}
        options={{
          title: 'Attachments',
          tabBarIcon: ({color}: any) => (
            <Icon name="wallet" type="Fontisto" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default CourseTabNavigator;
