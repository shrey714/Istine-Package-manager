import React from 'react';
import {ScrollView} from 'react-native';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import * as Animatable from 'react-native-animatable';
import COMPOSER from '../../assets/images/COMPOSER.png';
import DOCKER from '../../assets/images/DOCKER.png';
import FLUTTER from '../../assets/images/FLUTTER.png';
import GO from '../../assets/images/GO.png';
import NPM from '../../assets/images/NPM.png';
import PYPI from '../../assets/images/PYPI.png';
import {View, Dimensions, Pressable, Image} from 'react-native';
import {SharedElement} from 'react-navigation-shared-element';
const {width} = Dimensions.get('screen');
const imgarray = [NPM, COMPOSER, DOCKER, PYPI, FLUTTER, GO];
const ITEM_WIDTH = width * 0.9;
const ITEM_HEIGHT = ITEM_WIDTH * 0.8;
const Second = ({navigation, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      useNativeDriver={true}
      style={{flex: 1}}>
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            alignItems: 'center',
            paddingTop: 14,
          }}>
          {imgarray.map((item, index) => (
            <View key={index}>
              <Pressable
                style={{marginBottom: 14}}
                onPress={() => navigation.navigate('Quiz', {item, index})}>
                <SharedElement id={`item.${index}.image_url`}>
                  <Image
                    style={{
                      borderRadius: 10,
                      width: ITEM_WIDTH,
                      height: ITEM_HEIGHT,
                    }}
                    source={item}
                    resizeMode="cover"
                  />
                </SharedElement>
              </Pressable>
            </View>
          ))}
        </ScrollView>
      </View>
    </Animatable.View>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Second.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Second);
