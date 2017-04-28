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

const opciones = [
    "Perfil",
    "Mis Recetas",
    "Mis menus",
    "Favoritos",
    "Terminos",
];

const ModalStack = {
    ListRecipe: {
        name: "Mis recetas",
        description: "Listado de foo baz",
        image: require('../imagenes/heart.png'),
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
        image: require('../imagenes/account-circle.png'),
        screen: User,
    },
    /*ShowRecipe: {
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
    },*/
    NewRecipe:{
        name: "Crea un nueva receta",
        description: "Vista para crear una nueva receta",
        image: require("../imagenes/plus-circle-outline.png"),
        screen: RecipesApi.default.NewRecipe,
    },
    /*NewMenu:{
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
    },*/
};



const MainScreen = ({ navigation }) => (
  <View style={{backgroundColor: "#fff"},styles.barra}>
    <Banner />
    {Object.keys(ModalStack).map((routeName: string) =>
      <TouchableOpacity
        key={routeName}
        onPress={() => {
          const { path, params, screen } = ModalStack[routeName];
          const { router } = screen;
          const action = path && router.getActionForPathAndParams(path, params);
          navigation.navigate(routeName, {}, action);
        }}
      >
        <View style={styles.item}>
          <Image style={styles.image} source = {ModalStack[routeName].image} />
        </View>
      </TouchableOpacity>
    )}
  </View>
);

const Start = StackNavigator({
    ...ModalStack,
    Index: {
        screen: MainScreen,
    },
},
{
    initialRouteName: 'Index',
    headerMode: 'none',
    mode: 'card',
});

export default Start;

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
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
  },
  description: {
    fontSize: 13,
    color: '#999',
  },
  barra: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      backgroundColor: "#ccc",
      width: -1,
      marginTop: 10,
  }
});


/*export default class Start extends Component {
    constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(opciones)
    };
  }
    render() {
        return (<View style={{flex: 1, paddingTop: 22, alignItems: 'center'}}>
        <ListView
            style={estilosStart.item}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text onPress={()=>{}} style={estilosStart.fondo}>{rowData}</Text>}
        />
      </View>
        );
    }
}

var estilosStart = StyleSheet.create({
    fondo: {
        width: -1,
        height: 100,
    },
    powder: {
        backgroundColor: "#fafafa",
    },
    sky: {
        backgroundColor: "#f5f5f5",
    },
    item:{
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ddd',
    }

});*/

//export default Start;
