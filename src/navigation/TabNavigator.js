import React from 'react';
import {Vibration} from 'react-native';
import First from '../screens/first/First';
import Second from '../screens/second/Second';
import Forth from '../screens/forth/Forth';
import Fifth from '../screens/fifth/Fifth';
import Infoandsearch from '../navigation/Infoandsearch';
import TabBarIcon from '../components/TabBarIcon';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const Tab = createBottomTabNavigator();
const TabNavigator = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const btnvibration = {
    tabPress: e => {
      // Vibration.vibrate(5);
    },
  };

  return (
    <>
      <Tab.Navigator
        sceneContainerStyle={{backgroundColor: PC}}
        initialRouteName="First"
        screenOptions={({route}) => {
          let tabname = route.name;
          return {
            tabBarIcon: ({focused, color, size}) =>
              TabBarIcon(focused, color, size, tabname),
            tabBarActiveTintColor: SC,
            tabBarInactiveTintColor: 'gray',
            headerStyle: {
              backgroundColor: PC,
              borderBottomWidth: 0.5,
              borderBottomColor:
                PC === '#000' || PC === '#1F1B24' ? '#ADADAD' : '#000',
            },
            headerTintColor:
              PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            headerTitleStyle: {
              fontWeight: '200',
              fontSize: 25,
            },
            tabBarShowLabel: false,
            tabBarStyle: [
              {
                backgroundColor: PC,
                height: 58,
                marginBottom: 0,
                borderTopWidth: 0.5,
                borderTopColor:
                  PC === '#000' || PC === '#1F1B24' ? '#ADADAD' : '#000',
              },
              null,
            ],
          };
        }}>
        <Tab.Screen name="First" listeners={btnvibration} component={First} />
        <Tab.Screen
          name="Second"
          component={Second}
          options={{headerShown: false}}
          listeners={btnvibration}
        />
        <Tab.Screen
          name="Infoandsearch"
          listeners={btnvibration}
          component={Infoandsearch}
          options={{headerShown: false}}
        />
        <Tab.Screen name="Forth" listeners={btnvibration} component={Forth} />
        <Tab.Screen name="Fifth" listeners={btnvibration} component={Fifth} />
      </Tab.Navigator>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

TabNavigator.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(TabNavigator);
