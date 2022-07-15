/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {FlatList, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import GreetingText from './GreetingText';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import Notify from './Notify';
import PackagesApi from './PackagesApi';
import {Center, Image, Button, Text, Box, VStack, Skeleton} from 'native-base';
import Icon from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
const First = ({navigation, colorlist, onPress, initialState}) => {
  const greettext = GreetingText();
  const chatnavigation = useNavigation();
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
              chatnavigation.navigate('Chat');
            }}>
            <Icon name="chat" size={23} color={SC} />
          </TouchableOpacity>
        </>
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [SC]);

  const [isLoaded, setIsLoaded] = useState(false);
  setTimeout(() => {
    setIsLoaded(true);
  }, 4000);

  const Shrey = ({item}) => {
    return (
      <Center key={item.id} w="100%" style={{marginTop: 10}}>
        <Box w="90%" maxWidth="400">
          <VStack
            maxWidth="400"
            shadow={2}
            background={PC}
            borderWidth={PC === '#000' || PC === '#1F1B24' ? 1 : 0}
            overflow="hidden"
            borderRadius={5}
            borderColor={'rgba(255,255,255,0.5)'}>
            <Skeleton style={{height: 180}} isLoaded={isLoaded}>
              <Image
                alt="_"
                style={{height: 180}}
                resizeMode={'cover'}
                source={item.image}
              />
            </Skeleton>
            <Skeleton.Text marginTop={'4'} lines={2} px="4" isLoaded={isLoaded}>
              <Text
                style={{
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                }}
                marginTop="4"
                px="4"
                fontSize={'md'}
                numberOfLines={4}
                fontFamily={'Quicksand-SemiBold'}
                lineHeight={'20px'}>
                {item.data}
              </Text>
            </Skeleton.Text>
            <Skeleton
              marginY="4"
              width={'90%'}
              alignSelf="center"
              rounded="md"
              startColor="primary.100"
              isLoaded={isLoaded}>
              <Button
                m="4"
                style={{
                  backgroundColor: TC,
                }}
                onPress={() => {
                  Linking.openURL(item.url);
                }}>
                <Text
                  fontSize={'lg'}
                  numberOfLines={1}
                  fontFamily={'Quicksand-Bold'}
                  style={{color: TC === '#000' ? '#fff' : '#000'}}>
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
      <FlatList
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        data={PackagesApi}
        renderItem={Shrey}
        keyExtractor={item => item.id}
      />
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
    paddingBottom: 65,
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
