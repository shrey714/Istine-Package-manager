import React, {useEffect} from 'react';
import {StyleSheet, View, ScrollView, SafeAreaView} from 'react-native';
import Favbox from '../../components/Favbox';
import getpackages from '../../action/package';
import OnlyLoading from '../../components/OnlyLoading';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

const Forth = ({navigation, getpackages, packageState, colorlist}) => {
  let PC = colorlist.Primarycolor;
  let SC = colorlist.Secondarycolor;
  let TC = colorlist.Ternarycolor;

  useEffect(() => {
    getpackages();
    navigation.setOptions({
      title: 'Favourite',
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (packageState.loading) {
    return <OnlyLoading />;
  }
  if (packageState.packages === []) {
    console.log('empty');
  }

  return (
    <>
      <SafeAreaView style={[styles.container, {backgroundColor: PC}]}>
        {packageState.packages.length === 0 ? (
          <View style={(styles.container, styles.flexbox)}>
            <Icon name="dropbox" size={100} color={SC} />
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.contentcontainer}>
            {packageState.packages.map(item => (
              <Favbox details={item} navigation={navigation} key={item.id} />
            ))}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

Forth.propTypes = {
  getpackages: propTypes.func.isRequired,
  packageState: propTypes.object.isRequired,
  colorlist: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  packageState: state.addpackage,
  colorlist: state.colorreducer.colours,
});
const mapDispatchToProps = {
  getpackages,
};
export default connect(mapStateToProps, mapDispatchToProps)(Forth);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexbox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentcontainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  text: {
    fontSize: 40,
  },
});
