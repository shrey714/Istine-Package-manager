import auth from '@react-native-firebase/auth';
import Snackbar from 'react-native-snackbar';
import {Appearance} from 'react-native';
const colorScheme = Appearance.getColorScheme();

export const signUp = data => async dispatch => {
  const {email, password} = data;
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      console.log('data set done');
      Snackbar.show({
        text: 'account created',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signup failed',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    });
};

export const signIn = data => async dispatch => {
  const {email, password} = data;
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('signin done');
      Snackbar.show({
        text: 'signin done',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signin failed',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    });
};

export const signOut = () => async dispatch => {
  auth()
    .signOut()
    .then(() => {
      console.log('signout done');
      Snackbar.show({
        text: 'signout done',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    })
    .catch(error => {
      console.error(error);
      Snackbar.show({
        text: 'signout failed',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    });
};
