import React, { Component } from 'react';
import nativeImageSource from 'nativeImageSource';
import {
  StyleSheet,
  Text,
  View,
  ToolbarAndroid
} from 'react-native';

class Header extends Component {
    render() {
        return (
            <View title="ToolbarAndroid">
                <ToolbarAndroid
                    logo={require('../imagenes/egg48x48.png')}
                    title='Yomi!!'
                    actions={[{title:'Menu', icon: require('../imagenes/menu.png'),
                    show:'always'}]}

                    style={estilosHead.toolbar}
                    titleColor='#fff' />

            </View>

        );
    }
}

var estilosHead = StyleSheet.create({
    toolbar: {
        height: 65,
        backgroundColor: '#4883da'
    },
});


export default Header;
