import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import {useTheme} from 'styled-components';
import AllCourses from '../screens/AllCourses';
import MyCourses from '../screens/MyCourses';

function HomeTabs({navigation}: any) {
  const theme = useTheme();

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: theme.backgroundColor.primary,
        inactiveTintColor: '#bbb',
        labelStyle: {fontFamily: theme.fontFamily.QuicksandBold},
        tabStyle: {padding: 5},
        style: {height: 60, justifyContent: 'center'},
      }}>
      <Tab.Screen
        name="All Courses"
        component={AllCourses}
        options={{
          tabBarIcon: ({color}: any) => {
            return (
              <Icon name="react" type="Fontisto" color={color} size={22} />
            );
          },
        }}
      />
      <Tab.Screen
        name="My Courses"
        component={MyCourses}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon name="wallet" type="Fontisto" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default HomeTabs;
