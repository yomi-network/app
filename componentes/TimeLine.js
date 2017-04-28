import React, { Component } from 'react';

import {
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import Terms from './Terminos';
import Header from './Header';
import * as RecipesApi from './RecipesFromApi';
import SearchBar from './SearchBar';
import Start from './Start';
import User from './User';
import * as Menus from './Menus';
import ImagePicker from './ImagePicker';
import Banner from './Banner';
import MenuBar from './MenuBar'

const ModalStack = {
    ShowRecipe: {
        name: "Muestra una receta",
        description: "Muestra el detalle de la receta",
        path: 'ShowRecipe/:name',
        screen: RecipesApi.default.SingleRecipe,
    },
};


export default class TimeLine extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        console.log(RecipesApi.default.Recipes);
        return(
            <View style={{flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end'}}>
                <View>
                    <Banner />
                </View>
                <ScrollView>
                        <View style={{marginTop: 60}}>
                                <RecipesApi.default.Recipes />
                        </View>
                        <View style={{marginTop: 60}}>
                                <Menus.default.Menus />
                        </View>

                </ScrollView>
                <View>
                    <MenuBar navigation={this.props.navigation}/>
                </View>
            </View>
        )
    }
}
