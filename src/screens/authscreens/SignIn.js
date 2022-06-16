/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {
  StyleSheet,
  Appearance,
  Text,
  ScrollView,
  Dimensions,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import {NativeBaseProvider, Box, FormControl, Input, Button} from 'native-base';
const screenwidth = Dimensions.get('screen').width;
const screenheight = Dimensions.get('screen').height;
import ChartScreen from '../../components/ChartScreen';
import {signIn} from '../../action/auth';
const colorScheme = Appearance.getColorScheme();

const SignIn = ({signIn}) => {
  const margin = {
    marginLeft: -screenwidth / 5.84,
    marginBottom: -screenheight / 12,
  };
  const datarray = [100, 45, 28, 40, 30, 80, 45, 60, 12, 20];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const doSignIn = () => {
    signIn({email, password});
  };
  return (
    <ScrollView
      contentContainerStyle={{flexGrow: 1}}
      showsVerticalScrollIndicator={false}>
      <NativeBaseProvider>
        <Box
          style={[
            styles.container,
            {backgroundColor: colorScheme === 'light' ? '#fff' : '#000'},
          ]}>
          <Box
            style={[
              styles.signbox,
              {backgroundColor: colorScheme === 'light' ? '#fff' : '#4d4d4d'},
            ]}>
            <Box style={styles.chartbox}>
              <ChartScreen value={datarray} style={margin} />
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}>
              <FormControl isRequired style={styles.signinbox}>
                <Box style={styles.headingbox}>
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
                  marginTop={screenheight / 20}
                  marginVertical={5}
                  width={screenwidth / 1.6}
                  borderRadius={0}
                  paddingLeft={1}
                  paddingRight={2}
                  borderWidth={1}
                  isRequired={true}
                  borderColor="#000"
                  placeholder="Email"
                  _focus={{borderColor: '#000'}}
                  value={email}
                  onChangeText={text => setEmail(text)}
                />
                <Input
                  fontSize="19"
                  type="password"
                  variant="underlined"
                  marginVertical={5}
                  width={screenwidth / 1.6}
                  paddingLeft={1}
                  paddingRight={2}
                  borderRadius={0}
                  borderWidth={1}
                  isRequired={true}
                  borderColor="#000"
                  placeholder="Password"
                  _focus={{borderColor: '#000'}}
                  value={password}
                  secureTextEntry={true}
                  onChangeText={text => setPassword(text)}
                />
                <Button
                  regular
                  block
                  onPress={doSignIn}
                  style={[
                    styles.button,
                    {
                      backgroundColor:
                        colorScheme === 'light' ? '#fff' : '#000',
                      borderColor: colorScheme === 'dark' ? '#fff' : '#000',
                    },
                  ]}>
                  <Text
                    style={[
                      styles.buttontxt,
                      {
                        color: colorScheme === 'dark' ? '#fff' : '#000',
                      },
                    ]}>
                    SignIn
                  </Text>
                </Button>
              </FormControl>
            </ScrollView>
          </Box>
        </Box>
      </NativeBaseProvider>
    </ScrollView>
  );
};
const mapDispatchToProps = {
  signIn: data => signIn(data),
};

SignIn.propTypes = {
  signIn: propTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(SignIn);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  signbox: {
    width: screenwidth / 1.18,
    height: screenheight / 1.5,
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
    zIndex: 10,
    elevation: 3,
  },
  chartbox: {
    overflow: 'hidden',
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  signinbox: {
    flex: 1,
    paddingLeft: screenwidth / 18,
    alignItems: 'flex-start',
  },
  headingbox: {
    height: screenheight / 4.5,
    width: screenwidth / 1.18 - screenwidth / 18,
    paddingTop: screenheight / 8,
    justifyContent: 'flex-start',
    paddingRight: screenwidth / 18,
  },
  heading1: {
    color: '#000',
    fontSize: 27,
    fontWeight: 'bold',
  },
  heading2: {
    color: 'gray',
    fontSize: 18,
  },
  button: {
    width: screenwidth / 2.7,
    marginTop: screenheight / 10,
    alignSelf: 'flex-end',
    borderBottomLeftRadius: 30,
    borderTopLeftRadius: 30,
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderRightWidth: 0.5,
    borderBottomWidth: 1,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  buttontxt: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
