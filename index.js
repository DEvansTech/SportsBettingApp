/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
// import Setup from './Setup';
import 'react-native-gesture-handler';
import { name as appName } from './app.json';

global.__reanimatedWorkletInit = () => {};
AppRegistry.registerComponent(appName, () => App);
