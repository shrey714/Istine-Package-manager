/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Vibration,
  StyleSheet,
  Linking,
} from 'react-native';
import GreetingText from './GreetingText';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Snackbar from 'react-native-snackbar';
import Notify from './Notify';
import PackagesApi from './PackagesApi';
import {Center, Image, Button, Text, Box, VStack, Skeleton} from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';
const First = ({navigation, colorlist, onPress, initialState}) => {
  const greettext = GreetingText();
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  useEffect(() => {
    navigation.setOptions({
      title: greettext,
      headerRight: () => (
        <>
          <TouchableOpacity
            style={styles.buttonarea}
            onPress={() => {
              Vibration.vibrate(5);
              Snackbar.show({
                text: 'Empty',
                textColor:
                  PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
                    ? '#fff'
                    : '#000',
                backgroundColor:
                  PC === '#000' || PC === '#1F1B24' || PC === '#949398FF'
                    ? '#000'
                    : '#fff',
              });
            }}>
            <Icon name="bell-o" size={23} color={SC} />
          </TouchableOpacity>
        </>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [isLoaded, setIsLoaded] = useState(false);
  setTimeout(() => {
    setIsLoaded(true);
  }, 5000);

  const Shrey = (item, index) => {
    return (
      <Center key={index} w="100%" style={{marginTop: 10}}>
        <Box w="90%" maxWidth="400">
          <VStack
            maxWidth="400"
            shadow={3}
            background={PC}
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
                style={{backgroundColor: TC, elevation: 2}}
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}>
        {PackagesApi.map((item, index) => Shrey(item, index))}
      </ScrollView>
      <Notify />
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
