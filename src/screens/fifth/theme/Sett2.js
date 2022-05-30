import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Colorpick from './Colorpick';
import propTypes from 'prop-types';
import {connect} from 'react-redux';
import ColorTheme from './ColorThemes';

const Sett2 = ({colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;
  return (
    <>
      <ScrollView
        contentContainerStyle={[styles.container, {backgroundColor: PC}]}>
        <Colorpick ColorTheme={ColorTheme.colour1} type={'Primary'} />
        <Colorpick ColorTheme={ColorTheme.colour2} type={'Secondary'} />
        <Colorpick ColorTheme={ColorTheme.colour3} type={'Ternary'} />
      </ScrollView>
    </>
  );
};

const mapStateToProps = state => ({
  colorlist: state.colorreducer.colours,
});

Sett2.prototype = {
  colorlist: propTypes.object.isRequired,
};

export default connect(mapStateToProps)(Sett2);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 5,
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
