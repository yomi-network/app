import React, { Component } from 'react';
import { Text, TextInput, View, StyleSheet,ListView } from 'react-native';
import DrawerExample from './Header';
import SearchBar from './SearchBar';

const opciones = [
    "Perfil",
    "Mis Recetas",
    "Mis menus",
    "Favoritos",
    "Terminos",
];

export default class Start extends Component {
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
          renderRow={(rowData) => <Text style={estilosStart.fondo}>{rowData}</Text>}
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

});

//export default Start;
