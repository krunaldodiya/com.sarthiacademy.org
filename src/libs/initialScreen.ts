import {getUniqueId} from 'react-native-device-info';
import {screens} from './screens';

export const getInitialScreen = (authUser: any) => {
  if (authUser?.unique_id && authUser?.unique_id !== getUniqueId()) {
    return screens.InvalidDevice.name;
  }

  if (authUser?.status === false) {
    return screens.EditProfile.name;
  }

  return screens.HomeTabNavigator.name;
};
