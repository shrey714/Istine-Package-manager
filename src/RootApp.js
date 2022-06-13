import React, {useEffect} from 'react';
import {StatusBar, Appearance} from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import DrawerNavigator from './navigation/DrawerNavigator';
import AuthNavigation from './navigation/AuthNavigation';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoadingAnimation from './components/LoadingAnimation';
const Stack = createStackNavigator();
import {IS_AUTHENTICATED} from './action/action.types';
import {useDispatch, connect} from 'react-redux';
import propTypes from 'prop-types';
import SplashScreen from 'react-native-splash-screen';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
const colorScheme = Appearance.getColorScheme();

const RootApp = ({authState, colorlist}) => {
  const dispatch = useDispatch();
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
  // changeNavigationBarColor(
  //   colorScheme === 'light' ? 'white' : 'black',
  //   true,
  //   true,
  // );
  changeNavigationBarColor(
    PC === '#000' || PC === '#1F1B24' ? 'black' : 'white',
    true,
    true,
  );
  useEffect(() => {
    StatusBar.setBarStyle(
      PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content',
    );

    const susbcriber = auth().onAuthStateChanged(onAuthStateChanged);
    return susbcriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (authState.loading) {
    return <LoadingAnimation />;
  }

  return (
    <>
      <NavigationContainer
        onReady={async () => {
          SplashScreen.hide();
          StatusBar.setBarStyle(
            PC === '#000' || PC === '#1F1B24'
              ? 'light-content'
              : 'dark-content',
          );
        }}>
        <StatusBar
          translucent={true}
          backgroundColor={PC}
          barStyle={
            PC === '#000' || PC === '#1F1B24' ? 'light-content' : 'dark-content'
          }
          // animated={true}
        />
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
