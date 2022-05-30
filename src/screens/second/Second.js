import React, {useEffect} from 'react';
import {StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Packagebox from './Packagebox';
import COMPOSER from '../../assets/images/COMPOSER.png';
import docker from '../../assets/images/docker.png';
import FLUTTER from '../../assets/images/FLUTTER.png';
import GO from '../../assets/images/GO.png';
import NPM from '../../assets/images/NPM.png';
import PYPI from '../../assets/images/PYPI.png';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Second = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  useEffect(() => {
    navigation.setOptions({
      title: 'Quiz',
    });
  });
  return (
    <>
      <>
        <SafeAreaView style={[styles.container, {backgroundColor: PC}]}>
          <ScrollView contentContainerStyle={styles.contentcontainer}>
            <Packagebox name={'NPM'} bg={NPM} />
            <Packagebox name={'FLUTTER'} bg={FLUTTER} />
            <Packagebox name={'PYPI'} bg={PYPI} />
            <Packagebox name={'COMPOSER'} bg={COMPOSER} />
            <Packagebox name={'DOCKER'} bg={docker} />
            <Packagebox name={'GO'} bg={GO} />
          </ScrollView>
        </SafeAreaView>
      </>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Second.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Second);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
