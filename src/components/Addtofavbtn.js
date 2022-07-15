/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, Share, View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import * as Animatable from 'react-native-animatable';
import shortid from 'shortid';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import {firebase} from '@react-native-firebase/auth';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

const Addtofavbtn = ({packagename, link, colorlist, packageversion}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  // let TC = colorlist.Ternarycolor;
  const onShare = async () => {
    try {
      Share.share({
        message: `ISTINE
${packagename}(${packageversion})

${link}
`,
      });
    } catch (error) {
      Snackbar.show({
        text: 'Failed to share',
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
  const Separator = () => (
    <View
      style={[
        {
          marginVertical: 10,
          borderBottomWidth: StyleSheet.hairlineWidth,
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24' ? '#fff' : '#737373',
        },
      ]}
    />
  );
  return (
    <Menu>
      <MenuTrigger
        children={
          <Animatable.View
            animation="fadeIn"
            duration={400}
            style={styles.buttonarea}
            useNativeDriver={true}>
            <Icon name="bars" size={23} color={SC} />
          </Animatable.View>
        }
      />
      <MenuOptions
        customStyles={{
          optionsWrapper: {
            backgroundColor: PC,
            padding: 10,
          },
        }}>
        <MenuOption
          customStyles={{
            optionWrapper: {
              flexDirection: 'row',
            },
          }}
          onSelect={() => addpackage()}>
          <Icon style={{marginRight: 10}} name="flag-o" size={23} color={SC} />
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            }}>
            Save
          </Text>
        </MenuOption>
        <Separator />
        <MenuOption
          customStyles={{
            optionWrapper: {
              flexDirection: 'row',
            },
          }}
          onSelect={onShare}>
          <Icon style={{marginRight: 10}} name="share" size={23} color={SC} />
          <Text
            style={{
              fontFamily: 'Quicksand-Bold',
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            }}>
            Share
          </Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
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
