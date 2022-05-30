/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  View,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import shortid from 'shortid';
import Markdown from 'react-native-markdown-display';
import propTypes from 'prop-types';
import {connect} from 'react-redux';

const NPMscreen = ({detailsdata, readme, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  const [data, setdata] = useState('');
  const [readdata, setreaddata] = useState('');
  useEffect(() => {
    const loaddata = async () => {
      setdata(await detailsdata);
      setreaddata(await readme);
    };
    loaddata();
  }, [detailsdata, readme]);
  const Separator = () => <View style={styles.separator} />;
  return (
    <>
      <ScrollView style={[styles.container, {backgroundColor: PC}]}>
        <Text style={styles.titletext}>DETAILS</Text>
        <View style={styles.mainbox}>
          <Text
            style={[
              styles.text,
              {fontSize: 18, fontWeight: 'bold', color: SC},
            ]}>
            {data.name}
          </Text>
          <Separator />
          <Text
            style={[
              styles.text,
              {fontSize: 18, fontWeight: 'bold', color: SC},
            ]}>
            v{data.version}
          </Text>
          <Separator />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 18,
                  fontWeight: 'bold',
                  marginRight: 4,
                  color: '#000',
                },
              ]}>
              {data.license}
            </Text>
            <Icon name={'bookmark'} size={16} color={'#000'} />
          </View>
          <Separator />
          <Text style={[styles.text, {fontSize: 14, color: '#212121'}]}>
            {data.description}
          </Text>
        </View>
        <Separator />
        <Text style={styles.titletext}>LINKS</Text>
        <View style={[styles.secondbox, styles.mainbox]}>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(data?.homepage);
            }}
            style={[styles.buttonbox, {backgroundColor: TC}]}>
            <Text
              style={[
                styles.text,
                {fontSize: 16, fontWeight: '500', color: '#000'},
              ]}>
              <Icon name={'external-link-square'} size={25} color={'#000'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://www.npmjs.com/package/' + data?.name);
            }}
            style={[styles.buttonbox, {backgroundColor: TC}]}>
            <Text
              style={[
                styles.text,
                {fontSize: 16, fontWeight: '500', color: '#000'},
              ]}>
              <Icon2 name={'npm'} size={35} color={'#000'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(data?.repository?.url.substr(4));
            }}
            style={[styles.buttonbox, {backgroundColor: TC}]}>
            <Text
              style={[
                styles.text,
                {fontSize: 16, fontWeight: '500', color: '#000'},
              ]}>
              <Icon name={'github-square'} size={25} color={'#000'} />
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(data?.bugs?.url);
            }}
            style={[styles.buttonbox, {backgroundColor: TC}]}>
            <Text
              style={[
                styles.text,
                {fontSize: 16, fontWeight: '500', color: '#000'},
              ]}>
              <Icon name={'bug'} size={25} color={'#000'} />
            </Text>
          </TouchableOpacity>
        </View>
        <Separator />
        <Text style={styles.titletext}>INSTALL</Text>
        <View style={[styles.thirdbox, styles.mainbox]}>
          <Text
            style={[
              styles.text,
              {fontSize: 19, fontWeight: 'bold', color: SC},
            ]}>
            npm install {data.name}
          </Text>
        </View>
        <Separator />
        <View style={[styles.forthbox, styles.mainbox]}>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            KEYWORDS
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            {data.keywords?.map(e => (
              <View key={shortid.generate()} style={styles.textbox}>
                <Text style={[styles.text, {fontSize: 14, color: '#212121'}]}>
                  {e}
                </Text>
              </View>
            ))}
          </View>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            ENGINES
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            {data.engines ? (
              Object.entries(data?.engines).map(val => (
                <View key={shortid.generate()} style={styles.textbox}>
                  <Text
                    key={shortid.generate()}
                    style={[styles.text, {color: '#212121', fontSize: 14}]}>
                    {val[0]} = {val[1]}
                  </Text>
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            DEPENDENCIES
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            {data.dependencies ? (
              Object.entries(data?.dependencies).map(val => (
                <View key={shortid.generate()} style={styles.textbox}>
                  <Text
                    key={shortid.generate()}
                    style={[styles.text, {color: '#212121', fontSize: 14}]}>
                    {val[0]} = {val[1]}
                  </Text>
                </View>
              ))
            ) : (
              <></>
            )}
          </View>
        </View>
        <Separator />
        <View style={[styles.fifthbox, styles.mainbox]}>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            TOTALFILES
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            <View key={shortid.generate()} style={styles.textbox}>
              <Text style={[styles.text, {fontSize: 14, color: '#212121'}]}>
                {data?.dist?.fileCount}
              </Text>
            </View>
          </View>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            SIZE
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            <View key={shortid.generate()} style={styles.textbox}>
              <Text style={[styles.text, {color: '#212121', fontSize: 14}]}>
                {data?.dist?.unpackedSize}
              </Text>
            </View>
          </View>
          <Text style={[styles.text, {color: '#000', fontWeight: 'bold'}]}>
            DOWNLOADS
          </Text>
          <Separator />
          <View style={[styles.spebox, {backgroundColor: TC}]}>
            <View key={shortid.generate()} style={styles.textbox}>
              <Text style={[styles.text, {color: '#212121', fontSize: 14}]}>
                23,24,000
              </Text>
            </View>
          </View>
        </View>
        <Separator />
        <Text style={styles.titletext}>README</Text>
        <View style={[styles.sixthbox, styles.mainbox]}>
          <Markdown
            style={{
              body: {color: '#212121'},
            }}>
            {readdata}
          </Markdown>
        </View>
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

NPMscreen.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(NPMscreen);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    flex: 1,
    paddingVertical: 5,
  },
  titletext: {
    color: '#000',
    fontWeight: 'bold',
  },
  text: {
    // color: '#000',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  mainbox: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 5,
    marginVertical: 5,
    padding: 10,
  },
  secondbox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  buttonbox: {
    width: '40%',
    marginHorizontal: '5%',
    marginVertical: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 3,
  },
  thirdbox: {},
  forthbox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  spebox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
    padding: 10,
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 3,
  },
  fifthbox: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
  },
  textbox: {
    display: 'flex',
    width: 'auto',
    margin: 5,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 0.5,
    borderColor: '#000',
    borderRadius: 3,
  },
  sixthbox: {
    marginBottom: 32,
  },
});
