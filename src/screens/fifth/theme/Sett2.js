import React, {useEffect} from 'react';
import {InterstitialAd, TestIds} from 'react-native-google-mobile-ads';
import {ScrollView, StyleSheet} from 'react-native';
import Colorpick from './Colorpick';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import ColorTheme from './ColorThemes';

const Sett2 = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const adUnitId = __DEV__
    ? TestIds.INTERSTITIAL
    : 'ca-app-pub-7393727234144842/5645996548';

  const interstitial = InterstitialAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: false,
  });

  useEffect(() => {
    interstitial.load();
    // console.log('loaded2');
  }, [interstitial]);
  return (
    <>
      <ScrollView contentContainerStyle={[styles.container]}>
        <Colorpick
          sendadata={interstitial}
          ColorTheme={ColorTheme.colour1}
          type={'Primary'}
        />
        <Colorpick
          sendadata={interstitial}
          ColorTheme={ColorTheme.colour2}
          type={'Secondary'}
        />
        <Colorpick
          sendadata={interstitial}
          ColorTheme={ColorTheme.colour3}
          type={'Ternary'}
        />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett2.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Sett2);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
