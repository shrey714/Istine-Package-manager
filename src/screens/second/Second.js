import React from 'react';
// import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import QuizCards from './QuizCards';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Quiz from '../Quizscreen/Quiz';

const Stack = createSharedElementStackNavigator();

const Second = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: PC,
        },
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 25,
        },
      }}>
      <Stack.Screen
        name="Home"
        component={QuizCards}
        options={{title: 'Quiz'}}
      />
      <Stack.Screen
        name="Quiz"
        options={{headerShown: false}}
        component={Quiz}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Second.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Second);
