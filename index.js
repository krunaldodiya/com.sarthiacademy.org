import {AppRegistry, LogBox} from 'react-native';
LogBox.ignoreAllLogs(true);

import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
