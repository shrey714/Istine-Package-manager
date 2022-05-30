import React, {useRef} from 'react';
import {BannerAd, TestIds} from '@react-native-admob/admob';
import {View, StyleSheet} from 'react-native';
const Notify = () => {
  const bannerRef = useRef(null);
  //ca-app-pub-9203877977299363/8135429090
  return (
    <View style={styles.container22}>
      <BannerAd
        unitId={'ca-app-pub-9203877977299363/8135429090'}
        size={'BANNER'}
        ref={bannerRef}
        onAdFailedToLoad={error => console.error(error)}
      />
      <BannerAd
        unitId={TestIds.BANNER}
        size={'BANNER'}
        ref={bannerRef}
        onAdFailedToLoad={error => console.error(error)}
      />
    </View>
  );
};

export default Notify;
const styles = StyleSheet.create({
  container22: {
    position: 'absolute',
    bottom: 5,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
