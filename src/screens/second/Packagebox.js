import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SharedElement} from 'react-navigation-shared-element';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('window').width;

const Packagebox = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  let TC = props.colorlist.Ternarycolor;
  return (
    <Animatable.View animation="zoomIn" duration={500} useNativeDriver={true}>
      <TouchableOpacity
        style={styles.packagebox}
        onPress={() =>
          props.navigation.navigate('Quiz', {name: props.name, bg: props.bg})
        }>
        <View style={[styles.namebox, {backgroundColor: TC}]}>
          <Text style={styles.packagename}>{props.name}</Text>
        </View>
        <SharedElement id={`item.${props.name}.image_url`}>
          <Image source={props.bg} style={styles.back} />
        </SharedElement>
      </TouchableOpacity>
    </Animatable.View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Packagebox.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Packagebox);

const styles = StyleSheet.create({
  packagebox: {
    width: screenWidth / 2 - 4,
    marginVertical: 2,
    height: 350,
    borderRadius: 8,
    overflow: 'hidden',
  },
  back: {
    height: 280,
    // flex: 1,
    // position: 'absolute',
    width: screenWidth / 2,
    resizeMode: 'cover',
  },
  namebox: {
    width: screenWidth / 2,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  packagename: {
    color: 'white',
    fontSize: screenWidth / 15,
    fontWeight: 'bold',
  },
});
