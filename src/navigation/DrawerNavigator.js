import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Accdetails from '../components/Accdetails';
import {Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
const Drawer = createDrawerNavigator();

const DrawerNavigator = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  return (
    <>
      <Drawer.Navigator
        drawerContent={() => {
          return <Accdetails />;
        }}
        screenOptions={{
          drawerType: 'back',
          headerShown: false,
          swipeEnabled: true,
          swipeEdgeWidth: windowWidth / 3,
          overlayColor: PC,
          drawerStyle: {
            backgroundColor: PC,
          },
        }}>
        <Drawer.Screen
          name="Home"
          options={{
            drawerItemStyle: {display: 'none'},
          }}
          component={TabNavigator}
        />
      </Drawer.Navigator>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

DrawerNavigator.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(DrawerNavigator);
