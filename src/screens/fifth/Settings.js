/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
  Modal,
} from 'react-native';
import LOGO from '../../assets/images/LOGO.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import Icon4 from 'react-native-vector-icons/AntDesign';
import {signIn, signOut} from '../../action/auth';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
// import PushNotification from 'react-native-push-notification';

const Settings = ({signOut, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const [isOpen, setIsOpen] = React.useState(false);
  // const handleNotification = () => {
  //   PushNotification.getChannels(function (channel_ids) {
  //     console.log(channel_ids); // ['channel_id_1']
  //   });
  //   PushNotification.localNotification({
  //     channelId: 'test-channel',
  //     title: 'You clicked on ',
  //     message: 'helooooo',
  //     bigText: ' is one of the largest and most beatiful cities in ',
  //     color: 'red',
  //     id: 1,
  //   });
  // };

  return (
    <View style={[styles.container]}>
      <ScrollView
        contentContainerStyle={[
          styles.settingsbox,
          {
            flexGrow: 1,
            backgroundColor: TC,
            borderColor: TC === '#000' ? '#fff' : '#000',
          },
        ]}>
        <View style={styles.bottombox}>
          <Image source={LOGO} style={styles.image} />
        </View>
        <View>
          <Pressable
            onPress={() => navigation.navigate('Notifications')}
            style={({pressed}) => [
              styles.settings,
              {
                backgroundColor: pressed ? TC : PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon
              style={styles.icon}
              name="bell"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Notifications
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Theme')}
            style={({pressed}) => [
              styles.settings,
              {
                backgroundColor: pressed ? TC : PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon2
              style={styles.icon}
              name="palette"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Theme
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate('Bug Report')}
            style={({pressed}) => [
              styles.settings,
              {
                backgroundColor: pressed ? TC : PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon3
              style={styles.icon}
              name="bug-report"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Bug Report
            </Text>
          </Pressable>
          <Pressable
            // onPress={() => signOut()}
            onPress={() => setIsOpen(!isOpen)}
            style={({pressed}) => [
              styles.settings,
              {
                backgroundColor: pressed ? TC : PC,
                borderColor: TC === '#000' ? '#fff' : '#000',
              },
            ]}>
            <Icon
              style={styles.icon}
              name="sign-out"
              size={18}
              color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
            />
            <Text
              style={[
                styles.text,
                {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
              ]}>
              Sign Out
            </Text>
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        animationType="fade"
        transparent={true}
        statusBarTranslucent={true}
        hardwareAccelerated={true}
        visible={isOpen}
        onRequestClose={() => {
          setIsOpen(!isOpen);
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.4)',
          }}>
          <View
            style={{
              backgroundColor: '#fff',
              width: '68%',
              maxWidth: 350,
              elevation: 2,
              flexDirection: 'column',
              borderRadius: 8,
            }}>
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
                paddingVertical: 15,
                borderBottomWidth: 0.2,
                borderBottomColor: '#adadad',
              }}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 17,
                  fontWeight: '500',
                }}>
                Confirm?
              </Text>
              <Pressable
                onPress={() => {
                  setIsOpen(!isOpen);
                }}>
                <Icon4 name="close" size={23} color="#000" />
              </Pressable>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 0.2,
                borderBottomColor: '#ADADAD',
              }}>
              <Text style={{color: '#000', fontSize: 14, fontWeight: '400'}}>
                This will remove all settings related to Istine. This action
                cannot be reversed. Deleted data can not be recovered.
              </Text>
            </View>
            <View
              style={{
                width: '100%',
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderBottomWidth: 0.2,
                borderBottomColor: '#ADADAD',
                alignItems: 'flex-end',
              }}>
              <Pressable
                style={({pressed}) => [
                  {
                    backgroundColor: pressed
                      ? TC
                      : PC === '#000' || PC === '#1F1B24'
                      ? '#fff'
                      : '#000',
                    borderRadius: 4,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    elevation: 3,
                  },
                ]}
                onPress={() => {
                  signOut();
                }}>
                <Text
                  style={{
                    color: PC === '#000' || PC === '#1F1B24' ? '#000' : '#fff',
                    fontWeight: '500',
                    fontSize: 15,
                  }}>
                  Sign out
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

const mapDispatchToProps = {
  signOut,
};

Settings.prototypes = {
  signOut: propTypes.func.isRequired,
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  settingsbox: {
    width: '100%',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    overflow: 'hidden',
    justifyContent: 'space-between',
  },
  settings: {
    elevation: 2,
    width: '100%',
    height: 50,
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  icon: {
    marginHorizontal: 10,
  },
  bottombox: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 150,
    opacity: 1,
  },
});
