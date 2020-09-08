import {StoreProvider} from 'easy-peasy';
import React, {memo, useState} from 'react';
import {useQuery} from 'react-query';
import {ThemeProvider} from 'styled-components';
import {authUserApi} from './src/api/authUserApi';
import RootStackNavigator from './src/navigation/Root';
import {store} from './src/store/store';
import {black} from './src/themes/black';

function App() {
  const [loaded, setLoaded] = useState(false);

  useQuery('auth_user', authUserApi, {
    retry: false,
    onSettled: () => {
      setLoaded(true);
    },
  });

  if (!loaded) {
    return null;
  }

  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={black}>
        <RootStackNavigator />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default memo(App);
