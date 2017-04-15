import React, { Component } from 'react';
import { Text, TextInput, View } from 'react-native';

class SearchBar extends Component {
    render() {
        return (
            <View style={{backgroundColor: '#f7941e'}}>
                <TextInput style={{height: 80, backgroundColor: '#fff', fontSize: 25}}
                    placeholder="¿Qué se te antoja?"
                    inlineImageLeft={'../imagenes/search.png'}/>
            </View>
        );
    }
}

export default SearchBar;
