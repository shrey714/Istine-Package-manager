import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Packagebox from './Packagebox';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import COMPOSER from '../../assets/images/COMPOSER.png';
import DOCKER from '../../assets/images/DOCKER.png';
import FLUTTER from '../../assets/images/FLUTTER.png';
import GO from '../../assets/images/GO.png';
import NPM from '../../assets/images/NPM.png';
import PYPI from '../../assets/images/PYPI.png';

const Second = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  return (
    <>
      <>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentcontainer}>
          <Packagebox navigation={navigation} name={'NPM'} bg={NPM} />
          <Packagebox navigation={navigation} name={'FLUTTER'} bg={FLUTTER} />
          <Packagebox navigation={navigation} name={'PYPI'} bg={PYPI} />
          <Packagebox navigation={navigation} name={'COMPOSER'} bg={COMPOSER} />
          <Packagebox navigation={navigation} name={'DOCKER'} bg={DOCKER} />
          <Packagebox navigation={navigation} name={'GO'} bg={GO} />
        </ScrollView>
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
  contentcontainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
});
