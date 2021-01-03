import {StoreProvider} from 'easy-peasy';
import React, {memo} from 'react';
import {ThemeProvider} from 'styled-components';
import RootStackNavigator from './src/navigation/Root';
import {store} from './src/store/store';
import {black} from './src/themes/black';

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={black}>
        <RootStackNavigator />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default memo(App);
