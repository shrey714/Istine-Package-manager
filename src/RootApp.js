import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
// import {getStatusBarHeight} from 'react-native-status-bar-height';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import DrawerNavigator from './navigation/DrawerNavigator';
import AuthNavigation from './navigation/AuthNavigation';
import Neterror from './components/Neterror';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoadingAnimation from './components/LoadingAnimation';
const Stack = createStackNavigator();
import {IS_AUTHENTICATED} from './action/action.types';
import {useDispatch, connect} from 'react-redux';
import propTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {useNetInfo} from '@react-native-community/netinfo';
const RootApp = ({authState, colorlist}) => {
  const dispatch = useDispatch();
  const netinfo = useNetInfo();
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const onAuthStateChanged = user => {
    if (user) {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: true,
      });
    } else {
      dispatch({
        type: IS_AUTHENTICATED,
        payload: false,
      });
    }
  };
  useEffect(() => {
    changeNavigationBarColor(
      PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
        ? 'black'
        : 'white',
      true,
      true,
    );
  }, [PC]);

  useEffect(() => {
    StatusBar.setBarStyle(
      PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content',
    );

    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const [connection, setconnection] = useState(false);

  if (authState.loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <NavigationContainer
        onReady={async () => {
          StatusBar.setBarStyle(
            PC === '#000' || PC === '#1F1B24'
              ? 'light-content'
              : 'dark-content',
          );
          SplashScreen.hide();
          setconnection(true);
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={PC}
          barStyle={
            PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content'
          }
          // animated={true}
        />
        {connection && !netinfo.isConnected ? <Neterror /> : <></>}
        <Stack.Navigator screenOptions={{headerShown: false}}>
          {/* !authState.isauthenticated */}
          {!authState.isauthenticated ? (
            <Stack.Screen
              name="authpage"
              component={AuthNavigation}
              options={{
                ...TransitionPresets.ScaleFromCenterAndroid,
              }}
            />
          ) : (
            // User is signed in
            <Stack.Screen name="mainpage" component={DrawerNavigator} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
const mapStateToProps = state => ({
  authState: state.auth,
  colorlist: state.colorreducer.colours,
});

RootApp.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(RootApp);
