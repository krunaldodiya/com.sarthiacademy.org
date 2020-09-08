import {getUniqueId} from 'react-native-device-info';
import {useQuery} from 'react-query';
import {authUserApi} from '../api/authUserApi';
import {screens} from '../libs/screens';

function useInitialScreen(
  from: string,
): {
  getInitialScreen: () => any;
  authUser: any;
} {
  const {data: authUser, error, status}: any = useQuery(
    from !== 'Guest' && 'auth_user',
    authUserApi,
    {
      retry: false,
    },
  );

  function getInitialScreen() {
    if (status === 'loading') {
      return screens.Loading.name;
    }

    if (from === 'Root') {
      if (error && error.response.status === 401) {
        return screens.Guest.name;
      }

      if (authUser) {
        return screens.Auth.name;
      }
    }

    if (from === 'Guest') {
      return screens.RequestOtp.name;
    }

    if (from === 'Auth') {
      if (authUser?.unique_id && authUser?.unique_id !== getUniqueId()) {
        return screens.InvalidDevice.name;
      }

      if (authUser?.status === false) {
        return screens.EditProfile.name;
      }

      return screens.Drawer.name;
    }

    if (from === 'Drawer') {
      return screens.Courses.name;
    }
  }

  return {getInitialScreen, authUser};
}

export {useInitialScreen};
