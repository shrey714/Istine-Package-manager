import React, {useRef, useEffect} from 'react';
import {Animated, Easing, StyleSheet, View} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const LoadingAnimation = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  let TC = props.colorlist.Ternarycolor;

  const anima = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anima, {
        toValue: 2,
        duration: 2000,
        easing: Easing.elastic(2.8),
        useNativeDriver: true,
      }),
    ).start();
  }, [anima]);
  const spin = anima.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['0deg', '180deg', '360deg'],
  });
  const sizespin = anima.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [1, 1.5, 1],
  });

  return (
    <>
      <View style={[styles.container, {backgroundColor: PC}]}>
        <Animated.View // Special animatable View
          style={[
            styles.box,
            {transform: [{rotate: spin}, {scale: sizespin}], borderColor: SC},
          ]}>
          <View style={[styles.innerbox, {borderColor: SC}]} />
        </Animated.View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

LoadingAnimation.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(LoadingAnimation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderWidth: 2.3,
    borderRadius: 150,
    borderTopColor: 'rgba(0,0,0,0)',
    borderBottomColor: 'rgba(0,0,0,0)',
  },
  innerbox: {
    width: 30,
    height: 30,
    borderWidth: 2,
    borderRadius: 150,
  },
});
