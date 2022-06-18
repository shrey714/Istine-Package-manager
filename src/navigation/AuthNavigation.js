import React, {useEffect} from 'react';
import {Vibration, Dimensions} from 'react-native';
import SignIn from '../screens/authscreens/SignIn';
import SignUp from '../screens/authscreens/SignUp';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PushNotification from 'react-native-push-notification';

const TopTab = createMaterialTopTabNavigator();

const AuthNavigation = () => {
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
  };

  const btnvibration = {
    tabPress: e => {
      // Vibration.vibrate(5);
    },
  };

  useEffect(() => {
    createChannels();
  }, []);
  return (
    <>
      <TopTab.Navigator
        tabBarPosition="top"
        screenOptions={{
          tabBarAllowFontScaling: true,
          tabBarBounces: true,
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 23,
            color: '#000',
          },
          tabBarItemStyle: {
            width: Dimensions.get('window').width / 2,
          },
          tabBarStyle: {
            backgroundColor: '#fff',
            marginTop: getStatusBarHeight(),
            width: Dimensions.get('window').width,
          },
          tabBarPressColor: '#000',
        }}>
        <TopTab.Screen
          name="SignIn"
          listeners={btnvibration}
          component={SignIn}
        />
        <TopTab.Screen
          name="SignUp"
          listeners={btnvibration}
          component={SignUp}
        />
      </TopTab.Navigator>
    </>
  );
};

export default AuthNavigation;
