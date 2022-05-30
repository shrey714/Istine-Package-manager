/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import 'react-native-gesture-handler';

PushNotification.configure({
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
});

AppRegistry.registerComponent(appName, () => App);
