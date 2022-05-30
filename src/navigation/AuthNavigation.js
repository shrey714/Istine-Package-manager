import React, {useEffect} from 'react';
import {Vibration, Dimensions, Appearance} from 'react-native';
import SignIn from '../screens/authscreens/SignIn';
import SignUp from '../screens/authscreens/SignUp';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PushNotification from 'react-native-push-notification';
const colorScheme = Appearance.getColorScheme();

const TopTab = createMaterialTopTabNavigator();

const AuthNavigation = () => {
  const createChannels = () => {
    PushNotification.createChannel({
      channelId: 'test-channel',
      channelName: 'Test Channel',
    });
    console.log('channel created');
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
          activeTintColor: '#000',
          tabBarBounces: true,
          inactiveTintColor: '#636363',
          tabBarLabelStyle: {
            fontWeight: 'bold',
            fontSize: 25,
            color: colorScheme === 'dark' ? 'gray' : '#000',
          },
          tabBarItemStyle: {
            width: Dimensions.get('window').width / 2,
          },
          tabBarStyle: {
            backgroundColor: colorScheme === 'light' ? '#fff' : '#000',
            marginTop: getStatusBarHeight(),
            width: Dimensions.get('window').width,
          },
          tabBarPressColor: colorScheme === 'light' ? '#000' : '#fff',
          indicatorStyle: {
            // borderBottomColor: 'red',
            borderBottomWidth: 2,
            // borderColor: 'red',
          },
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
