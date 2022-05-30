import React, {useRef} from 'react';
import {BannerAd, TestIds} from '@react-native-admob/admob';
import {View, StyleSheet} from 'react-native';
const WideAd = () => {
  const bannerRef = useRef(null);

  return (
    <View style={styles.container22}>
      <BannerAd
        unitId={TestIds.BANNER}
        size={'WIDE_SKYSCRAPER'}
        ref={bannerRef}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
};

export default WideAd;
const styles = StyleSheet.create({
  container22: {
    flex: 1,
    paddingBottom: 5,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
