import React, {useEffect} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
const SettingsStack = createStackNavigator();
import Settings from './Settings';
import Sett1 from './notifications/Sett1';
import Sett2 from './theme/Sett2';
import Sett3 from './bug_report/Sett3';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Fifth = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  useEffect(() => {
    navigation.setOptions({
      title: 'settings',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <SettingsStack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.ModalSlideFromBottomIOS,
        presentation: 'transparentModal',
      }}>
      <SettingsStack.Screen name="Settings" component={Settings} />
      <SettingsStack.Screen name="Sett1" component={Sett1} />
      <SettingsStack.Screen name="Sett2" component={Sett2} />
      <SettingsStack.Screen name="Sett3" component={Sett3} />
    </SettingsStack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Fifth.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Fifth);
