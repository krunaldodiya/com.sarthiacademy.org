import {action} from 'easy-peasy';
import {getUniqueId} from 'react-native-device-info';
import {screens} from '../../libs/screens';

export const homeModel = {
  unique_id: getUniqueId(),
  initialScreen: screens.RequestOtp.name,
  selectedCourseId: null,

  setInitialScreen: action((state: any, screen: any) => {
    state.initialScreen = screen;
  }),

  setSelectedCourseId: action((state: any, courseId: any) => {
    state.selectedCourseId = courseId;
  }),
};
