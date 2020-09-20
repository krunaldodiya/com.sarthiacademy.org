import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from 'react-native-dynamic-vector-icons';
import {useTheme} from 'styled-components';
import {screens} from '../libs/screens';
import Attachments from '../screens/courses/Attachments';
import Downloads from '../screens/courses/Downloads';
import Live from '../screens/courses/Live';
import Subjects from '../screens/courses/Subjects';
import Tests from '../screens/courses/Tests';

function CourseTabs({route, navigation}: any) {
  const theme = useTheme();
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={screens.Subjects.name}
      tabBarOptions={{
        activeTintColor: theme.backgroundColor.primary,
        inactiveTintColor: '#bbb',
        labelStyle: {fontFamily: theme.fontFamily.QuicksandBold},
        tabStyle: {padding: 5},
        style: {height: 60, justifyContent: 'center'},
      }}>
      <Tab.Screen
        name={screens.Subjects.name}
        component={Subjects}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon name="youtube" type="AntDesign" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Downloads.name}
        component={Downloads}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon name="download" type="Fontisto" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Tests.name}
        component={Tests}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon name="md-trophy" type="Ionicons" color={color} size={22} />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Attachments.name}
        component={Attachments}
        options={{
          tabBarIcon: ({color}: any) => (
            <Icon
              name="file-pdf-o"
              type="FontAwesome"
              color={color}
              size={22}
            />
          ),
        }}
      />
      <Tab.Screen
        name={screens.Live.name}
        component={Live}
        options={{
          tabBarIcon: ({color}: any) => {
            return (
              <Icon
                name="live-tv"
                type="MaterialIcons"
                color={color}
                size={22}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default CourseTabs;
