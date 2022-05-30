import React from 'react';

import Third from '../screens/third/Third';
import Infopage from '../screens/infopage/Infopage';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
const Stack = createStackNavigator();

const Infoandsearch = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: PC,
          borderBottomWidth: 0.5,
          borderBottomColor: '#000',
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: '200',
          fontSize: 25,
        },
      }}
      initialRouteName="Third">
      <Stack.Screen
        name="Third"
        options={{headerShown: false}}
        component={Third}
      />
      <Stack.Screen
        name="Infopage"
        options={{
          presentation: 'transparentModal',
          ...TransitionPresets.ModalSlideFromBottomIOS,
        }}
        component={Infopage}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Infoandsearch.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Infoandsearch);
