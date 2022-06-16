import React from 'react';
import {
  StyleSheet,
  Pressable,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import {AlertDialog, Button, NativeBaseProvider} from 'native-base';
import LOGO from '../../assets/images/LOGO.png';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import Icon3 from 'react-native-vector-icons/MaterialIcons';
import {signIn, signOut} from '../../action/auth';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
// import PushNotification from 'react-native-push-notification';

const Settings = ({signOut, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const [isOpen, setIsOpen] = React.useState(false);

  const onClose = () => setIsOpen(false);

  const cancelRef = React.useRef(null);
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
    <NativeBaseProvider>
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
                {backgroundColor: pressed ? TC : PC},
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
                {backgroundColor: pressed ? TC : PC},
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
                {backgroundColor: pressed ? TC : PC},
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
                {backgroundColor: pressed ? TC : PC},
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
        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content>
            <AlertDialog.CloseButton />
            <AlertDialog.Header>Sign Out</AlertDialog.Header>
            <AlertDialog.Body>
              This will remove all settinhs related to Istine. This action
              cannot be reversed. Deleted data can not be recovered.
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}>
                  Cancel
                </Button>
                <Button
                  colorScheme="danger"
                  onPress={() => {
                    onClose();
                    signOut();
                  }}>
                  Sign Out
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>
    </NativeBaseProvider>
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
