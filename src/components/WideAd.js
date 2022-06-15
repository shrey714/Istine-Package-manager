import React from 'react';
import {View, ScrollView, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';
const adUnitId = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-7393727234144842/8422249415';
const WideAd = () => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.adcontainer}>
      <BannerAd
        unitId={adUnitId}
        size={'WIDE_SKYSCRAPER'}
        onAdFailedToLoad={error => {
          console.log(error);
        }}
      />
    </ScrollView>
  );
};

export default WideAd;
const styles = StyleSheet.create({
  adcontainer: {
    paddingBottom: 5,
    alignSelf: 'center',
  },
});
