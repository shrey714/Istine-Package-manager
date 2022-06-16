import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {ColorPicker} from 'react-native-btr';
import {connect} from 'react-redux';
import setPST from '../../../action/color';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

function ColorPickerDemo({type, sendadata, setPST, colorlist, ColorTheme}) {
  let PC = colorlist.colours.Primarycolor;
  let SC = colorlist.colours.Secondarycolor;
  let TC = colorlist.colours.Ternarycolor;
  const [btnback, setbtnback] = useState();
  const [selectedColor, setSelectedColor] = useState('');
  function setColor(color) {
    setSelectedColor(color);
  }
  useEffect(() => {
    const setbtnbackground = () => {
      if (type === 'Primary') {
        setSelectedColor(PC);
      } else if (type === 'Secondary') {
        setSelectedColor(SC);
      } else if (type === 'Ternary') {
        setSelectedColor(TC);
      }
    };
    setbtnbackground();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const setbtnbackground = () => {
      if (type === 'Primary') {
        setbtnback(PC);
      } else if (type === 'Secondary') {
        setbtnback(SC);
      } else if (type === 'Ternary') {
        setbtnback(TC);
      }
    };
    setbtnbackground();
  }, [PC, SC, TC, type]);

  const letsadd = async () => {
    if (type === 'Primary') {
      await setPST({
        Primarycolor: selectedColor,
        Secondarycolor: SC,
        Ternarycolor: TC,
      });
      // await setbtnbackground();
    } else if (type === 'Secondary') {
      await setPST({
        Primarycolor: PC,
        Secondarycolor: selectedColor,
        Ternarycolor: TC,
      });
    } else if (type === 'Ternary') {
      await setPST({
        Primarycolor: PC,
        Secondarycolor: SC,
        Ternarycolor: selectedColor,
      });
    }
  };

  return (
    <View style={[styles.container]}>
      {/* <Text style={[styles.text, {alignSelf: 'flex-start', color: SC}]}>
        {type}
      </Text> */}
      <View
        style={[
          styles.wrapper,
          {
            backgroundColor: `${selectedColor}`,
            borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
          },
        ]}>
        <ColorPicker
          colors={ColorTheme}
          selectedColor={selectedColor}
          onSelect={setColor}
        />
      </View>
      <TouchableOpacity
        style={[
          styles.setbox,
          {
            backgroundColor: btnback,
            borderColor: PC === '#000' || PC === '#1F1B24' ? '#fff' : '#000',
          },
        ]}
        onPress={() => {
          letsadd();
          sendadata.show();
        }}>
        <Icon
          name="circle-o"
          size={30}
          color={type === 'Secondary' ? '#000' : SC}
        />
      </TouchableOpacity>
    </View>
  );
}

const mapStateToProps = state => ({
  colorlist: state.colorreducer,
});

const mapDispatchToProps = {
  setPST: data => setPST(data),
};
ColorPickerDemo.propTypes = {
  setPST: propTypes.func.isRequired,
};
export default connect(mapStateToProps, mapDispatchToProps)(ColorPickerDemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    width: '80%',
    marginTop: 10,
  },
  text: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  setbox: {
    elevation: 5,
    width: 60,
    marginTop: 10,
    height: 60,
    borderRadius: 150,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
