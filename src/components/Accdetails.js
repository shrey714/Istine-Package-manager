import React, {useState, useEffect} from 'react';
import {Text, ScrollView, StyleSheet, View, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import getpackages from '../action/package';
import LOGO from '.././assets/images/LOGO.png';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {firebase} from '@react-native-firebase/auth';
import WideAd from './WideAd';

const Accdetails = ({getpackages, packageState, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const [obj, setobj] = useState({visited: 0, added: 0});

  const letlet = async () => {
    setobj({
      visited: 0,
      added: packageState?.loading ? 0 : packageState?.packages?.length,
    });
  };

  useEffect(() => {
    getpackages();
    letlet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [packageState?.packages?.length]);
  return (
    <>
      <View style={[styles.container, {backgroundColor: PC}]}>
        <View
          // showsVerticalScrollIndicator={false}
          style={[
            styles.settingsbox,
            {
              backgroundColor: TC,
              borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            },
          ]}>
          <View style={styles.bottombox}>
            <Image source={LOGO} style={styles.image} />
          </View>
          <View
            style={[
              styles.settings,
              {
                backgroundColor: PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon
              style={styles.icon}
              name="user-o"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              {firebase.auth()._user.email}
            </Text>
          </View>
          <View
            style={[
              styles.settings,
              {
                backgroundColor: PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon
              style={styles.icon}
              name="dot-circle-o"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              numberOfLines={1}
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Favourite : {obj.added}
            </Text>
          </View>
          <WideAd />
        </View>
        <View style={[styles.bottomsettings]}>
          <Text
            numberOfLines={1}
            style={[
              styles.text,
              {
                fontSize: 15,
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              },
            ]}>
            {firebase.auth()._user.uid}
          </Text>
        </View>
      </View>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
  packageState: state.addpackage,
});

Accdetails.prototype = {
  getpackages: propTypes.func.isRequired,
  packageState: propTypes.object.isRequired,
  colorlist: propTypes.object.isRequired,
};

const mapDispatchToProps = {
  getpackages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Accdetails);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
    padding: 10,
  },
  settingsbox: {
    flexGrow: 1,
    flex: 1,
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 10,
  },
  bottombox: {
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150,
    opacity: 1,
  },
  settings: {
    width: '100%',
    height: 50,
    elevation: 2,
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 5,
    paddingRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
    width: '80%',
  },
  icon: {
    marginHorizontal: 10,
  },
  bottomsettings: {
    alignSelf: 'center',
    bottom: 0,
  },
});
