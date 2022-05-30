/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {View, ScrollView, StyleSheet, Text} from 'react-native';
import BottomSheet from '../../components/BottomSheet';
import axios from 'axios';
import OnlyLoading from '../../components/OnlyLoading';
import NPMscreen from '../detailscreen/NPMscreen';
import Addtofavbtn from '../../components/Addtofavbtn';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const Infopage = ({route, navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const {packagename, packageversion} = route.params;
  const [details, setdetails] = useState(null);
  const [readme, setreadme] = useState(null);
  const [loading, setloading] = useState(false);
  const [maindata, setmaindata] = useState(null);
  const [bool, setbool] = useState(false);

  const fetchdetails = async () => {
    try {
      setloading(true);
      const {data} = await axios.get(
        'https://registry.npmjs.org/' + packagename,
      );
      const loaddata = await data.versions;
      setreadme(await data?.readme);
      setmaindata(await loaddata[packageversion]);
      setdetails(await loaddata);
      setbool(true);
      setloading(false);
    } catch (error) {
      console.log('error');
    }
  };

  useEffect(() => {
    fetchdetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    navigation.setOptions({
      title: packagename + '(' + packageversion + ')',
      headerRight: () => (
        <Addtofavbtn
          packagename={packagename}
          packageversion={packageversion}
        />
      ),
    });
    if (bool) {
      async function wait() {
        setmaindata(await details[packageversion]);
      }
      wait();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [route]);
  return details ? (
    <>
      <View style={[styles.contentbox, {backgroundColor: PC}]}>
        <ScrollView
          contentContainerStyle={[styles.container, {backgroundColor: PC}]}>
          {maindata ? (
            <NPMscreen detailsdata={maindata} readme={readme} />
          ) : (
            <></>
          )}
        </ScrollView>
        <BottomSheet
          packagename={packagename}
          navigation={navigation}
          package={details}
        />
      </View>
    </>
  ) : (
    <View
      style={[
        styles.contentbox,
        {alignItems: 'center', justifyContent: 'center'},
      ]}>
      <OnlyLoading />
    </View>
  );
};
const styles = StyleSheet.create({
  contentbox: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
  },
});

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Infopage.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Infopage);
