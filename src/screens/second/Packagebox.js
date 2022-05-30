import React from 'react';
import {
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const screenWidth = Dimensions.get('screen').width;

const Packagebox = props => {
  let PC = props.colorlist.Primarycolor;
  let SC = props.colorlist.Secondarycolor;
  let TC = props.colorlist.Ternarycolor;
  return (
    <TouchableOpacity style={styles.packagebox}>
      <Image source={props.bg} style={styles.back} />
      <Text style={styles.packagename}>{props.name}</Text>
    </TouchableOpacity>
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
    position: 'absolute',
    width: screenWidth / 2,
    resizeMode: 'cover',
  },
  packagename: {
    color: 'white',
    width: screenWidth / 2,
    fontSize: screenWidth / 15,
    lineHeight: 84,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: '#000',
    opacity: 0.7,
  },
});
