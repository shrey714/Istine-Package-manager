/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef} from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('screen').width;

const Favbox = ({details, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  let Anim = useRef(new Animated.Value(0)).current;

  const [olele, setolele] = useState(false);
  const toggleHandle = () => {
    setolele(!olele);

    Animated.timing(Anim, {
      toValue: !olele ? 1 : 0,
      duration: 300,
      easing: Easing.elastic(0.7),
      delay: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <>
      <TouchableOpacity
        disabled={olele ? true : false}
        style={[styles.box, {backgroundColor: TC}]}
        onPress={() =>
          navigation.navigate('Infoandsearch', {
            screen: 'Infopage',
            params: {
              packagename: details.packagename,
              packageversion: details.packageversion,
            },
          })
        }>
        <Animated.View
          style={[
            styles.manubox,
            {
              opacity: Anim,
            },
            {
              // transform: [{scale: Anim}],
            },
          ]}>
          <TouchableOpacity
            disabled={olele ? false : true}
            style={[styles.trashbtn, {borderColor: SC}]}>
            <Icon name="trash" size={35} color={SC} />
          </TouchableOpacity>
        </Animated.View>

        <TouchableOpacity
          style={[
            styles.menubtn,
            {backgroundColor: !olele ? TC : '#000', borderColor: SC},
          ]}
          onPress={() => toggleHandle()}>
          <Icon name="ellipsis-v" size={22} color={SC} />
        </TouchableOpacity>

        <View style={styles.packagebox}>
          <Text style={styles.packagetext}>{details?.packagename}</Text>
        </View>

        <View style={[styles.versionbox, {backgroundColor: PC}]}>
          <Text style={[styles.versiontext, {color: SC}]}>
            {details?.packageversion}
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Favbox.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Favbox);

const styles = StyleSheet.create({
  box: {
    width: '46%',
    height: 210,
    margin: '2%',
    alignItems: 'center',
    borderRadius: 6,
    borderWidth: 0.5,
    overflow: 'hidden',
  },
  packagetext: {
    color: '#212121',
    fontSize: 24,
  },
  versiontext: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  packagebox: {
    height: 150,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  versionbox: {
    width: '100%',
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
  manubox: {
    position: 'absolute',
    width: '100%',
    height: 210,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  menubtn: {
    zIndex: 2,
    position: 'absolute',
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    borderWidth: 2,
    margin: 7,
    top: 0,
    right: 0,
  },
  trashbtn: {
    zIndex: -1,
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 150,
    borderWidth: 2,
  },
});
