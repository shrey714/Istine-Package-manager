/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  FlatList,
  Vibration,
} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import OnlyLoading from '../../components/OnlyLoading';
import axios from 'axios';
import {NativeBaseProvider} from 'native-base';
import Accordion from './Accordion';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
const shortid = require('shortid');
const screenheight = Dimensions.get('screen').height;

const Third = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  const [inputSearch, setInputSearch] = useState('');
  const [details, setdetails] = useState(null);
  const [startsearch, setstartsearch] = useState(true);
  const [loading, setloading] = useState(false);
  const fetchdetails = async () => {
    try {
      setloading(true);
      const {data} = await axios.get(
        'https://registry.npmjs.org/-/v1/search?text=' + inputSearch,
      );
      setdetails(data.objects);
    } catch (error) {
      console.log('error');
    }
    setloading(false);
  };

  // useEffect(() => {
  //   fetchdetails();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [startsearch]);

  const renderaccordian = item => {
    return (
      <Accordion navigation={navigation} key={shortid.generate()} item={item} />
    );
    // return (
    //   <View
    //     key={shortid.generate()}
    //     style={{
    //       width: '90%',
    //       height: 150,
    //       backgroundColor: '#ADADAD',
    //       margin: 10,
    //       alignSelf: 'center',
    //     }}></View>
    // );
  };

  return (
    <>
      <SafeAreaView style={[styles.container, {backgroundColor: PC}]}>
        {!loading ? (
          <NativeBaseProvider>
            <FlatList
              contentContainerStyle={{
                paddingBottom: getStatusBarHeight() + 5,
                marginTop: getStatusBarHeight(),
              }}
              ListHeaderComponent={
                <View style={[styles.heading, {backgroundColor: PC}]}>
                  <TextInput
                    placeholderTextColor={'gray'}
                    style={[styles.searchbox, {backgroundColor: TC}]}
                    value={inputSearch}
                    onChangeText={setInputSearch}
                    onEndEditing={() => {
                      // setstartsearch(inputSearch);
                      fetchdetails();
                    }}
                    placeholder="Search"
                  />
                </View>
              }
              data={details}
              renderItem={({item}) => renderaccordian(item)}
              stickyHeaderIndices={[0]}
              keyExtractor={() => shortid.generate()}
              showsVerticalScrollIndicator={false}
              stickyHeaderHiddenOnScroll={true}
              // onEndReached={() => Vibration.vibrate(5)}
            />
          </NativeBaseProvider>
        ) : (
          <View
            style={{alignItems: 'center', justifyContent: 'center', flex: 1}}>
            <OnlyLoading />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Third.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Third);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    // flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#000',
  },
  emptybox: {
    marginTop: (screenheight - 250) / 2,
    alignSelf: 'center',
  },
  searchbox: {
    width: '95.23%',
    color: '#000',
    marginHorizontal: 40,
    height: 40,
    paddingLeft: 10,
    borderRadius: 5,
    alignSelf: 'center',
  },
});
