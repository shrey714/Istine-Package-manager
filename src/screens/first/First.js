/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Linking} from 'react-native';
import GreetingText from './GreetingText';
const shortid = require('shortid');
import FirstHeader from './FirstHeader';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
// import Notify from './Notify';
import PackagesApi from './PackagesApi';
import {
  Center,
  NativeBaseProvider,
  Image,
  Button,
  Text,
  Box,
  VStack,
  Skeleton,
} from 'native-base';

const First = ({navigation, colorlist, onPress, initialState}) => {
  const greettext = GreetingText();
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  useEffect(() => {
    // console.log(colorlist.colours);
    navigation.setOptions({
      title: greettext,
      headerRight: () => <FirstHeader />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);
  const [text, setText] = useState('');
  setTimeout(() => {
    setIsLoaded(true);
    setText(
      'Lose yourself in the greens of nature, the ones that make you strong. Come visit us at the Greenway Park, and we will be happy to show you around.',
    );
  }, 5000);

  const Shrey = item => {
    return (
      <Center key={shortid.generate()} w="100%" style={{marginTop: 10}}>
        <Box w="90%" maxWidth="400">
          <VStack
            maxWidth="400"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            borderColor={
              PC === '#000' || PC === '#1F1B24' ? '#F9F9F9' : '#000'
            }>
            <Skeleton h="40" isLoaded={isLoaded}>
              <Image
                alt="image here"
                h="40"
                source={{
                  uri: item.image,
                }}
              />
            </Skeleton>
            <Skeleton.Text lines={4} px="4" isLoaded={isLoaded}>
              <Text
                style={{
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                }}
                px="4"
                fontSize={'md'}
                lineHeight={'20px'}>
                {item.data}
              </Text>
            </Skeleton.Text>
            <Skeleton
              px="4"
              mb="4"
              rounded="md"
              startColor="primary.100"
              isLoaded={isLoaded}>
              <Button
                m="4"
                style={{backgroundColor: TC}}
                onPress={() => {
                  Linking.openURL(item.url);
                }}>
                <Text style={{color: TC === '#000' ? '#fff' : '#000'}}>
                  Explore
                </Text>
              </Button>
            </Skeleton>
          </VStack>
        </Box>
      </Center>
    );
  };

  return (
    <>
      <NativeBaseProvider>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          {PackagesApi.map(item => Shrey(item))}
        </ScrollView>
      </NativeBaseProvider>
      {/* <Notify /> */}
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

First.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(First);

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 0.5,
    paddingBottom: 10,
  },
  text: {
    fontSize: 40,
  },
});
