import React, { Component } from 'react';
import { Text,
    TextInput,
    View,
    StyleSheet,
    ListView,
    ScrollView,
    TouchableOpacity,
    Image } from 'react-native';

//import TimeLine from './TimeLine'; -- cuando es incluido causa error

import { getProfile } from '../utilities/api';

class MenuBar extends Component {
  constructor (props) {
    super(props);
  }

  validate(next, f) {
    var active = this.props.active !== undefined && this.props.active !== null ? this.props.active : 'Timeline';
    return () => {
      if (active !== next) f();
    }
  }

  render(){

    var navigation = this.props.navigation;
    var active = this.props.active !== undefined && this.props.active !== null ? this.props.active : 'Timeline';
    var homeIcon = require('../imagenes/home-inactive.png');
    var favoritesIcon = require('../imagenes/heart-inactive.png');
    var addIcon = require('../imagenes/add-inactive.png');
    var profileIcon = require('../imagenes/user-inactive.png');
    var searchIcon = require('../imagenes/search-inactive.png');

    if (active === 'Timeline') {
      homeIcon = require('../imagenes/home.png');
    }
    if (active === 'Favorites') {
      favoritesIcon = require('../imagenes/heart.png');
    }
    if (active === 'Add') {
      addIcon = require('../imagenes/add.png');
    }
    if (active === 'Profile') {
      profileIcon = require('../imagenes/user.png');
    }
    if (active === 'Search') {
      searchIcon = require('../imagenes/search.png');
    }

    return (
      <View style={styles.barra}>
        <TouchableOpacity onPress={ this.validate('Timeline', () => { navigation.navigate('Index') }) }>
          <Image style={styles.image} source={ homeIcon } />
        </TouchableOpacity>

        <TouchableOpacity onPress= { this.validate('Search', () => { navigation.navigate('ListRecipe') }) }>
          <Image style={styles.image} source={ searchIcon }/>
        </TouchableOpacity>

        <TouchableOpacity onPress= { this.validate('Add', () => { navigation.navigate('ListRecipe') }) }>
          <Image style={styles.image} source={ addIcon }/>
        </TouchableOpacity>

        <TouchableOpacity onPress= { this.validate('Favorites', () => {navigation.navigate('ListRecipe') }) }>
          <Image style={styles.image} source={ favoritesIcon }/>
        </TouchableOpacity>

        <TouchableOpacity onPress= { this.validate('Profile', () => { getProfile('admin_yomi', (data) =>
                navigation.navigate('Perfil', { profile: data })); }) }>
            <Image style={styles.image} source={ profileIcon } />
        </TouchableOpacity>
      </View>
    );
  }
}

export default MenuBar;

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 4,
    paddingVertical: 3,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
  },
  image: {
    width: 30,
    height: 30,
    alignSelf: 'center',
    marginTop: 15,
    marginBottom: 15,
    resizeMode: 'contain',
  },
  barra: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: "#FAFAFA",
      width: -1,
      marginTop: 10,
  }
});
