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
import * as RecipesApi from './componentes/RecipesFromApi';
import SearchBar from './componentes/SearchBar';
import Start from './componentes/Start';
import User from './componentes/User';
import * as Menus from './componentes/Menus';
import ImagePicker from './componentes/ImagePicker';
import TimeLine from './componentes/TimeLine';


const ModalStack = {
    ListRecipe: {
        name: "Mis recetas",
        description: "Listado de foo baz",
        screen: RecipesApi.default.Recipes,
        },
    ListMenu: {
        name: "Mis menus",
        description: "Listado de foo baz",
        screen: Menus.default.Menus,
    },
    Perfil: {
        name: "Perfil",
        description: "Vista de perfil",
        screen: User,
    },
    ShowRecipe: {
        name: "Muestra una receta",
        description: "Muestra el detalle de la receta",
        path: 'ShowRecipe/:name',
        screen: RecipesApi.default.SingleRecipe,
    },
    NewRecipe:{
        name: "Crea un nueva receta",
        description: "Vista para crear una nueva receta",
        screen: RecipesApi.default.NewRecipe,
    },
    NewMenu:{
        name: "Crea un nuevo menu",
        description: "Vista para crear nuevo menu",
        path: 'NewMenu',
        screen: Menus.default.Newmenu,
    },
    ShowMenu: {
        name: "Muestra una receta",
        description: "Muestra el detalle de la receta",
        path: 'Showmenu/:name',
        screen: Menus.default.Singlemenu,
    },
};


const YomiNavigation = StackNavigator({
    ListRecipe: {
        screen: RecipesApi.default.Recipes,
        },
    ListMenu: {
        screen: Menus.default.Menus,
    },
    Perfil: {
        screen: User,
    },
    ShowRecipe: {
        path: 'ShowRecipe/:name',
        screen: RecipesApi.default.SingleRecipe,
    },
    NewRecipe:{
        screen: RecipesApi.default.NewRecipe,
    },
    NewMenu:{
        screen: Menus.default.Newmenu,
    },
    ShowMenu: {
        screen: Menus.default.Singlemenu,
    },
    Index: {
        screen: TimeLine,
    },
},
{
    initialRouteName: 'Index',
    headerMode: 'none',
    mode: 'card',
});

export default yomi = ({navigation}) =>  <YomiNavigation navigation={navigation}/>


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
