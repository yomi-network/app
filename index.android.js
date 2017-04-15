import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import {StackNavigator} from 'react-navigation';
import Terms from './componentes/Terminos';
import Header from './componentes/Header';
import * as Recipes from './componentes/Recipes';
import SearchBar from './componentes/SearchBar';

const ModalStack = StackNavigator({
    ListRecipe: {
        name: "Lista de recetas",
        description: "Listado de foo baz",
        screen: Recipes.default.Recipes
    },
    ShowRecipe: {
        name: "Muestra una receta",
        description: "Muestra el detalle de la receta",
        path: 'ShowRecipe/:name',
        screen: Recipes.default.singleRecipe,
        navigationOptions: (navigation) => ({
        title: `${navigation.state.params.name}'s Profile'`,
    }),
    }
});


export default class yomi extends Component {
  render() {
      console.log(Terms.default)
      console.log(Header);
    return(
        <View style={{flex: 1}}>
            <ModalStack initialRouteName="ListRecipe"/>
        </View>
    );
  }
}

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('yomi', () => yomi);
