import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {useQuery} from 'react-query';
import {authUserApi} from '../api/authUserApi';
import DrawerMenu from '../components/DrawerMenu';
import {screens} from '../libs/screens';
import HomeTabs from './HomeTabs';

function HomeTabNavigator({navigation}: any) {
  const DrawerStack = createDrawerNavigator();

  const {data: authUser}: any = useQuery('auth_user', authUserApi, {
    retry: false,
  });

  return (
    <DrawerStack.Navigator
      drawerType="back"
      drawerStyle={{width: '80%'}}
      drawerContent={() => (
        <DrawerMenu authUser={authUser} navigation={navigation} />
      )}
      initialRouteName={screens.HomeTabs.name}>
      <DrawerStack.Screen name={screens.HomeTabs.name} component={HomeTabs} />
    </DrawerStack.Navigator>
  );
}

export default HomeTabNavigator;
