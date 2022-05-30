import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import {firebase} from '@react-native-firebase/auth';

const Addtofavbtn = ({packagename, packageversion}) => {
  const addpackage = async () => {
    try {
      const uidp = shortid.generate();
      let maile = await firebase.auth()._user.uid;
      await database().ref(`/packages/${maile}/${uidp}`).set({
        packagename,
        packageversion,
        id: uidp,
      });
      Snackbar.show({
        text: 'add to fav succsed',
        textColor: '#900',
        backgroundColor: '#fff',
      });
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'add to fav failed',
        textColor: '#900',
        backgroundColor: '#fff',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.buttonarea} onPress={addpackage}>
      <Icon name="flag-o" size={23} color="#900" />
    </TouchableOpacity>
  );
};

export default Addtofavbtn;
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
