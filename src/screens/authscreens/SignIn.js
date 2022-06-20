/* eslint-disable react-native/no-inline-styles */
import React, {useState, useRef, useEffect} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {
  StyleSheet,
  Easing,
  Animated,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
import LOGO from '../../assets/images/LOGO.png';
import {Box, Center, FormControl, Link, Input, Button} from 'native-base';
const screenwidth = Dimensions.get('window').width;
const screenheight = Dimensions.get('window').height;
import Snackbar from 'react-native-snackbar';
import ChartScreen from '../../components/ChartScreen';
import {signIn} from '../../action/auth';
import {forgotpass} from '../../action/auth';
const SignIn = ({signIn, forgotpass}) => {
  const margin = {
    marginLeft: -screenwidth / 5.9,
    marginBottom: -screenheight / 11.733,
  };
  const datarray = [100, 40, 80, 50, 60, 30, 60, 10, 40, 0];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doSignIn = () => {
    if (email === '' || password === '') {
      Snackbar.show({
        text: 'Please enter your email and password',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    } else {
      signIn({email, password});
    }
  };
  const doforgotpass = () => {
    if (email === '') {
      Snackbar.show({
        text: 'Please enter your email',
        textColor: '#fff',
        backgroundColor: 'rgba(0,0,0,0.5)',
      });
    } else {
      forgotpass({email});
    }
  };
  const anima = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(anima, {
        toValue: 1,
        duration: 1000,
        easing: Easing.elastic(2.8),
        useNativeDriver: true,
      }),
    ).start();
  }, [anima]);
  const spin = anima.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor: '#fff'}]}
        showsVerticalScrollIndicator={false}>
        <Box
          shadow={2}
          style={[
            styles.signbox,
            {
              backgroundColor: '#fff',
              width: screenwidth / 1.18,
              height: screenheight / 1.3,
            },
          ]}>
          <Box style={[styles.chartbox, {width: '100%'}]}>
            <ChartScreen value={datarray} style={margin} />
          </Box>
          <ScrollView
            contentContainerStyle={{flexGrow: 1}}
            showsVerticalScrollIndicator={false}>
            <Center paddingY={5}>
              <Animated.Image
                style={{
                  borderRadius: 150,
                  width: 100,
                  height: 100,
                  transform: [{rotate: spin}],
                }}
                resizeMode={'contain'}
                source={LOGO}
                alt="Alternate Text"
              />
            </Center>
            <FormControl isRequired style={styles.signinbox}>
              <Box marginBottom={2}>
                <Text size="lg" style={styles.heading1}>
                  Welcome Back
                </Text>
                <Text size="lg" style={styles.heading2}>
                  SignIn to pick up exactly where you left off
                </Text>
              </Box>
              <Input
                fontSize="19"
                type="email"
                variant="underlined"
                marginVertical={5}
                width={screenwidth / 1.6}
                maxW={'320'}
                borderRadius={0}
                paddingLeft={1}
                paddingRight={2}
                borderWidth={1}
                isRequired={true}
                borderColor="#000"
                placeholder="Email"
                _focus={{borderColor: '#900'}}
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <Input
                fontSize="19"
                type="password"
                variant="underlined"
                marginVertical={5}
                width={screenwidth / 1.6}
                maxW={'320'}
                paddingLeft={1}
                paddingRight={2}
                borderRadius={0}
                borderWidth={1}
                isRequired={true}
                borderColor="#000"
                placeholder="Password"
                _focus={{borderColor: '#900'}}
                value={password}
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
              <Link
                _text={{
                  color: '#900',
                  fontSize: 15,
                  fontWeight: '500',
                }}
                onPress={doforgotpass}
                isUnderlined={false}>
                Forgot password
              </Link>
              <Button
                regular
                shadow={1}
                _pressed={{
                  bg: '#ADADAD',
                }}
                block
                onPress={doSignIn}
                bg={'#fff'}
                style={[styles.button]}>
                <Text
                  style={[
                    styles.buttontxt,
                    {
                      color: '#000',
                    },
                  ]}>
                  SignIn
                </Text>
              </Button>
            </FormControl>
          </ScrollView>
        </Box>
      </ScrollView>
    </>
  );
};
const mapDispatchToProps = {
  signIn: data => signIn(data),
  forgotpass: data => forgotpass(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
  forgotpass: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signbox: {
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  chartbox: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
  },
  signinbox: {
    flex: 1,
    width: '100%',
    paddingLeft: screenwidth / (16 * 1.18),
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  heading1: {
    color: '#000',
    fontSize: 27,
    fontWeight: 'bold',
  },
  heading2: {
    color: '#ADADAD',
    fontWeight: '500',
    fontSize: 18,
  },
  button: {
    marginTop: screenheight / 25,
    borderWidth: 1,
    marginBottom: screenheight / 25,
  },
  buttontxt: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
