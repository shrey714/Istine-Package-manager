import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Vibration} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FirstHeader = ({SC}) => {
  return (
    <TouchableOpacity
      style={styles.buttonarea}
      onPress={() => Vibration.vibrate(5)}>
      <Icon name="bell-o" size={23} color={SC} />
    </TouchableOpacity>
  );
};

export default FirstHeader;
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
