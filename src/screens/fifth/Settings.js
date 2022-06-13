import React, {useEffect} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import LOGO from '../../assets/images/LOGO.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {signOut} from '../../action/auth';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import PushNotification from 'react-native-push-notification';

const Settings = ({signOut, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const handleNotification = () => {
    PushNotification.getChannels(function (channel_ids) {
      console.log(channel_ids); // ['channel_id_1']
    });
    PushNotification.localNotification({
      channelId: 'test-channel',
      title: 'You clicked on ',
      message: 'helooooo',
      bigText: ' is one of the largest and most beatiful cities in ',
      color: 'red',
      id: 1,
    });
  };

  return (
    <View style={[styles.container, {backgroundColor: PC}]}>
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
          <TouchableOpacity
            disabled={true}
            onPress={() => navigation.navigate('Sett1')}
            style={[styles.settings, {backgroundColor: PC}]}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Sett2')}
            style={[styles.settings, {backgroundColor: PC}]}>
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
          </TouchableOpacity>
          <TouchableOpacity
            disabled={true}
            onPress={() => navigation.navigate('Sett3')}
            style={[styles.settings, {backgroundColor: PC}]}>
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
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => signOut()}
            style={[styles.settings, {backgroundColor: PC}]}>
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
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    borderColor: '#000',
    backgroundColor: '#fff',
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
