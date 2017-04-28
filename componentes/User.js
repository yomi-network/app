import React, { Component } from 'react';
import { Text, TextInput, View, Image } from 'react-native';
import Banner from "./Banner";

class User extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end'}}>
                <View>
                    <Banner />
                </View>
                <ScrollView>
                    <Text>Informacion básica</Text>
                    <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between'}}>

                        <View style={{height: 100, width: 100}}><Image style={{height: 100, width: 100}} source={require("../imagenes/perfil.png")} />
                        </View>
                        <View>
                            <Text>Nombre</Text>
                            <Text>Acerca de mi</Text>
                        </View>
                    </View>
                    <View>
                        <Text>Recetas que me han gustado</Text>
                    </View>
                    <View>
                        <Text>Menus que me han gustado</Text>
                    </View>
                </ScrollView>
                <View><MenuBar /></View>
            </View>
        );
    }
}

export default User;
