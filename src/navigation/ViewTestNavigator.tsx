import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import {useTheme} from 'styled-components';
import TestRankings from '../screens/courses/TestRankings';
import TestResults from '../screens/courses/TestResults';

function ViewTestNavigator({route}: any) {
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
        initialParams={{...route.params}}
        name="Results"
        component={TestResults}
        options={{
          tabBarIcon: ({color}: any) => {
            return <Icon name="award" type="Feather" color={color} size={22} />;
          },
        }}
      />
      <Tab.Screen
        initialParams={{...route.params}}
        name="Rankings"
        component={TestRankings}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon name="open-book" type="Entypo" color={color} size={22} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default ViewTestNavigator;
