import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import shortid from 'shortid';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';

const Addtofavbtn = ({packagename, colorlist, packageversion}) => {
  let PC = colorlist.Primarycolor;
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
        text: 'Package added to favourite',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
            ? '#000'
            : '#fff',
      });
    } catch (error) {
      console.log(error);
      Snackbar.show({
        text: 'Package added to favourite failed',
        textColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
            ? '#fff'
            : '#000',
        backgroundColor:
          PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
            ? '#000'
            : '#fff',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.buttonarea} onPress={addpackage}>
      <Icon name="flag-o" size={23} color="#900" />
    </TouchableOpacity>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Addtofavbtn.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Addtofavbtn);

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
