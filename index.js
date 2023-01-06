/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
// import Setup from './Setup';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);
