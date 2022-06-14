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
  const Separator = () => (
    <View
      style={[
        styles.separator,
        {
          borderBottomColor:
            PC === '#000' || PC === '#1F1B24' ? '#fff' : '#737373',
        },
      ]}
    />
  );
  return (
    <ScrollView style={[styles.container]}>
      <Text
        style={[
          styles.titletext,
          {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        DETAILS
      </Text>
      <View
        style={[
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <Text
          style={[styles.text, {fontSize: 18, fontWeight: 'bold', color: SC}]}>
          {data.name}
        </Text>
        <Separator />
        <Text
          style={[styles.text, {fontSize: 18, fontWeight: 'bold', color: SC}]}>
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
                color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              },
            ]}>
            {data.license}
          </Text>
          <Icon
            name={'bookmark'}
            size={16}
            color={PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'}
          />
        </View>
        <Separator />
        <Text
          style={[
            styles.text,
            {
              fontSize: 14,
              color: PC === '#000' || PC === '#1F1B24' ? '#ffffff' : '#212121',
            },
          ]}>
          {data.description}
        </Text>
      </View>
      <Separator />
      <Text
        style={[
          styles.titletext,
          {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        LINKS
      </Text>
      <View
        style={[
          styles.secondbox,
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(data?.homepage);
          }}
          style={[styles.buttonbox, {backgroundColor: TC}]}>
          <Icon
            name={'external-link-square'}
            size={25}
            color={TC === '#000' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL('https://www.npmjs.com/package/' + data?.name);
          }}
          style={[styles.buttonbox, {backgroundColor: TC}]}>
          <Icon2
            name={'npm'}
            size={35}
            color={TC === '#000' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(data?.repository?.url.substr(4));
          }}
          style={[styles.buttonbox, {backgroundColor: TC}]}>
          <Icon
            name={'github-square'}
            size={25}
            color={TC === '#000' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            Linking.openURL(data?.bugs?.url);
          }}
          style={[styles.buttonbox, {backgroundColor: TC}]}>
          <Icon
            name={'bug'}
            size={25}
            color={TC === '#000' ? '#fff' : '#000'}
          />
        </TouchableOpacity>
      </View>
      <Separator />
      <Text
        style={[
          styles.titletext,
          {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        INSTALL
      </Text>
      <View
        style={[
          styles.thirdbox,
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <Text
          style={[styles.text, {fontSize: 19, fontWeight: 'bold', color: SC}]}>
          npm install {data.name}
        </Text>
      </View>
      <Separator />
      <View
        style={[
          styles.forthbox,
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          KEYWORDS
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          {data.keywords?.map(e => (
            <View
              key={shortid.generate()}
              style={[styles.textbox, {backgroundColor: PC}]}>
              <Text
                style={[
                  styles.text,
                  {
                    fontSize: 16,
                    color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                  },
                ]}>
                {e}
              </Text>
            </View>
          ))}
        </View>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          ENGINES
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          {data.engines ? (
            Object.entries(data?.engines).map(val => (
              <View
                key={shortid.generate()}
                style={[styles.textbox, {backgroundColor: PC}]}>
                <Text
                  key={shortid.generate()}
                  style={[
                    styles.text,
                    {
                      color:
                        PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                      fontSize: 16,
                    },
                  ]}>
                  {val[0]} = {val[1]}
                </Text>
              </View>
            ))
          ) : (
            <></>
          )}
        </View>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          DEPENDENCIES
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          {data.dependencies ? (
            Object.entries(data?.dependencies).map(val => (
              <View
                key={shortid.generate()}
                style={[styles.textbox, {backgroundColor: PC}]}>
                <Text
                  key={shortid.generate()}
                  style={[
                    styles.text,
                    {
                      color:
                        PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                      fontSize: 16,
                    },
                  ]}>
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
      <View
        style={[
          styles.fifthbox,
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          TOTALFILES
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          <View
            key={shortid.generate()}
            style={[styles.textbox, {backgroundColor: PC}]}>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 16,
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                },
              ]}>
              {data?.dist?.fileCount}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          SIZE
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          <View
            key={shortid.generate()}
            style={[styles.textbox, {backgroundColor: PC}]}>
            <Text
              style={[
                styles.text,
                {
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                  fontSize: 16,
                },
              ]}>
              {data?.dist?.unpackedSize}
            </Text>
          </View>
        </View>
        <Text
          style={[
            styles.text,
            {
              color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
              fontWeight: 'bold',
            },
          ]}>
          DOWNLOADS
        </Text>
        <Separator />
        <View style={[styles.spebox, {backgroundColor: TC}]}>
          <View
            key={shortid.generate()}
            style={[styles.textbox, {backgroundColor: PC}]}>
            <Text
              style={[
                styles.text,
                {
                  color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
                  fontSize: 16,
                },
              ]}>
              23,24,000
            </Text>
          </View>
        </View>
      </View>
      <Separator />
      <Text
        style={[
          styles.titletext,
          {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        README
      </Text>
      <View
        style={[
          styles.sixthbox,
          styles.mainbox,
          {borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
        ]}>
        <Markdown
          style={{
            code_block: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
            },
            table: {
              borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            },
            blockquote: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
            },
            tr: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
              borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            },
            th: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
              borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
            },
            code_inline: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
            },
            fence: {
              backgroundColor:
                PC === '#000' || PC === '#1F1B24' ? '#3d3d3d' : '#c9c9c9',
            },
            body: {color: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000'},
          }}>
          {readdata}
        </Markdown>
      </View>
    </ScrollView>
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
    paddingVertical: 5,
  },
  titletext: {
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  mainbox: {
    flex: 1,
    borderWidth: 1,
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
    borderRadius: 3,
  },
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
    borderRadius: 3,
  },
  sixthbox: {
    marginBottom: 32,
  },
});
