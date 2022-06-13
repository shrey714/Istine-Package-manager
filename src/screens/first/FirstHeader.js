import React from 'react';
import {TouchableOpacity, StyleSheet, Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const FirstHeader = ({colorlist}) => {
  let SC = colorlist.Secondarycolor;

  return (
    <TouchableOpacity
      style={styles.buttonarea}
      onPress={() => Vibration.vibrate(5)}>
      <Icon name="bell-o" size={23} color={SC} />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

FirstHeader.prototype = {
  colorlist: propTypes.object.isRequired,
};
export default connect(mapStateToProps)(FirstHeader);

const styles = StyleSheet.create({
  buttonarea: {
    marginRight: 8,
    backgroundColor: '#000',
    width: 40,
    height: 40,
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
