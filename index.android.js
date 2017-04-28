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
const ModalStack = StackNavigator({

    Opciones: {
        name: "Menu de opciones",
        description: "Listado de opciones",
        screen: Start,
        navigationOptions: {
            title: "Menú principal",
        },
    },
    ListRecipe: {
        name: "Lista de recetas",
        description: "Listado de foo baz",
        screen: RecipesApi.default.Recipes,
        },
    ListMenu: {
        name: "Lista de menus",
        description: "Listado de foo baz",
        screen: Menus.default.Menus,
        navigationOptions: {
            headerMode: 'none',
        },
    },
    Menu: {
        name: "menu",
        description: "opciones del la app",
        screen: Start,
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
        navigationOptions: {
            title: "Receta",
            headerMode: 'none',
            headerStyle: {
                backgroundColor: 'red',
            }
        },
    },
    NewRecipe:{
        name: "Crea un nueva receta",
        description: "Vista para crear una nueva receta",
        path: 'NewRecipe',
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
});

function opciones(titulo){
    return("{title:"+titulo+"},");
}
export default class yomi extends Component {
  render() {
      console.log(Terms.default)
      console.log(Header);
    return(
        <Start />
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
