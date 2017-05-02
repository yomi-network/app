/* @flow */

import React from 'react';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const Banner = () => (
  <View style={styles.banner}>
    <Image
      source={require('../imagenes/logo-yomi.png')}
      style={styles.image}
    />
  </View>
);

export default Banner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FAFAFA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  image: {
    height: 42,
    resizeMode: 'contain',
    margin: 8,
  },
  title: {
    height: 32,
    resizeMode: 'contain',
    margin: 8,
  },
});
