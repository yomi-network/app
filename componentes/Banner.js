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
      source={require('../imagenes/logo-yomi-positivo.png')}
      style={styles.image}
    />
<Text style={styles.title}>Yomi!!!</Text>
  </View>
);

export default Banner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: 'rgb(255,170,77)',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 0,
    marginTop: Platform.OS === 'ios' ? 20 : 0,
  },
  image: {
    width: 36,
    height: 36,
    resizeMode: 'contain',
    margin: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '200',
    color: '#fff',
    margin: 8,
    marginLeft: 110,
  },
});
