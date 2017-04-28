import React, { Component } from 'react';
import { Text,
    TextInput,
    View,
    StyleSheet,
    ListView,
    ScrollView,
    TouchableOpacity,
    Image} from 'react-native';
import DrawerExample from './Header';
import SearchBar from './SearchBar';
import {StackNavigator} from 'react-navigation';
import Terms from './Terminos';
import Header from './Header';
import * as RecipesApi from './RecipesFromApi';
import User from './User';
import * as Menus from './Menus';
import ImagePicker from './ImagePicker';
import Banner from './Banner';
import TimeLine from './TimeLine';
import {getProfile} from '../utilities/api';

class MenuBar extends Component {
    constructor (props){
        super(props);
    }
    static navigationOptions = {
        title: 'Mis menus',
    }
    render(){
        console.log("Props en menu bar", this.props.navigation);
        console.log("Dentro de Menu bar", this.props.navigation);
        var navigation =this.props.navigation;
        var ruta = "ListRecipe";
        console.log(ruta)
        return(

            <View style={styles.barra}>
                <TouchableOpacity
                    onPress= {() => {navigation.navigate('ListRecipe')}
                    }>
                    <Image style={styles.image}
                    source={require('../imagenes/heart.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {() => {navigation.navigate('ListRecipe')}}>
                    <Image style={styles.image}
                    source={require('../imagenes/plus-circle-outline.png')}/>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress= {() => {
                      getProfile('admin_yomi', (data) =>
                      navigation.navigate('Perfil', {profile: data}));
                    }}>
                    <Image style={styles.image}
                    source={require('../imagenes/account-circle.png')} />
                </TouchableOpacity>
            </View>
        )
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
    width: 36,
    height: 36,
    alignSelf: 'center',
    marginTop: 5,
    marginBottom: 5,
    resizeMode: 'contain',
  },
  barra: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
      backgroundColor: "#ccc",
      width: -1,
      marginTop: 10,
  }
});
