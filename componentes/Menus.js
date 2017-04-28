import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity,
  Button,
  Alert,
  TextInput,
  Switch
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import DB from './DB'
var DBEvents = require('react-native-db-models').DBEvents
import api from '../utilities/api';
import Picker from './ImagePicker';
import Banner from './Banner';

const onButtonPress = () => {
    Alert.alert("El boton ha sido presionado");
}

const get_menus = () => {
    DB.menus.get_all(function(result){
        console.log(result);
    })
}


class Menus extends Component{
    constructor(props) {
        super(props);
        this.state ={
            menuList: [],
        }
    }
    static navigationOptions = {
        title: 'Mis menus',

    }

    componentWillMount() {
        api.getMenus().then((res) => {
            console.log(res);
            this.setState({
                menuList: res
            })
        })
    }

    render(){
        console.log("Menus: ", this.state.menuList.results);
        if ( this.state.menuList.results === undefined || this.state.menuList.results === null){
            return this.renderLoadingView(this.props);
        }else if(this.state.menuList.results.length == 0){
            return renderEmptyView(this.props)
        }else {
            return menus(this.props,this.state.menuList.results)
        }

    }
    renderLoadingView(props) {
        console.log("renderLoadingView ",props);
        p = props;
        return (
            <View style={estilosMenu.container}>
                <Text>Cargando ... </Text>
                <Image style={{width: 48, height: 48}}
                    source={require("../imagenes/egg48x48.png")} />
            </View>
        );
    }
    renderEmptyView(props) {
        console.log("renderLoadingView ",props);
        p = props;
        return (
            <View style={estilosMenu.container}>
                <Text> Todavia no tienes ningún menú </Text>
                <Button title="Crea uno" onPress={
                        (p) => {
                            console.log(p)
                            props.navigation.navigate('NewMenu',{id: 'rec1'})}}/>
            </View>
        );
    }
}


function menus (props, menuList) {
    let menus = menuList;
    console.log(menus);
    console.log(props);
    return (

        <View style={{flex: 1}}>
            <View>
                <Banner />
            </View>
            <View style={{flex: 14}} title="Menus">
                <ScrollView>
                    {MenuList(menus, props)}
                </ScrollView>
            </View>
            <View style={{flex: 1}}>
                <Button style={{position: 'absolute', marginButtom: 0}}
                    onPress={ () => {
                        console.log(props); props.navigation.navigate('NewMenu')}}
                    title="Crear un Menu" />
                
            </View>
        </View>

        );
}

function MenuList(menus, props){
    console.log(props);
    let menList = menus.map((menu, i) => {
        return(
            //<TouchableOpacity key={menu.id}>
                <View key={i} style={{flex: 1, alignItems: 'center', borderBottomWidth: 5, borderBottomColor:'#cccccc'}}>
                    <TouchableOpacity onPress={ () => props.navigation.navigate('ShowMenu',menu)}>
                        <Image source={menu.images[0]} style={{width: 400, height: 350, marginTop:10}}/>
                    </TouchableOpacity>
                    <View>
                        <Text selectable={true}  style={estilosMenu.titulo}>{menu.title}</Text>

                        <Text selectable={true} style={estilosMenu.descripcion}>{menu.description}</Text>

                    </View>
                </View>
            //

        );
    });
    return(
        <View>{menList}</View>
    );
}

class Newmenu extends Component{
    constructor(props){
        super(props);
        this.state = {
            trueSwitchIsOn: true,
            falseSwitchIsOn: false,
            p: props,
                title: '',
                description: '',
                images: [],
                collaborative: false,
                entries: [],
        }
    }
    static navigationOptions = {
        title: 'Nuevo menu',
    }
    onChangeImage(data){
        console.log(data)
        this.setState({
            images: this.state.images.concat(data)
        })
        console.log("Images", this.state.images);
    }



    dumpState(menu, state){
        menu.title = state.title;
        menu.description = state.description;
        menu.images = state.images;
        menu.collaborative = state.collaborative;
        menu.entries = state.entries;
        return menu;
    }
    render(){
        const menuItems = {
            title: '',
            description: '',
            images: [],
            collaborative: false,
            entries: [],
        }
        console.log(this.state.p);
        return(
            <ScrollView style={{flex:1}}>
            <View>
                <View>
                    <Text>Información básica</Text>
                    <TextInput
                        onChangeText={(text) => {
                            this.setState({title: text})
                        }}
                        placeholder="Nombre del Menu"/>
                    <TextInput
                        style={{height:50}}
                        placeholder="Descripción"
                        onChangeText={(text) =>{
                            this.setState({description: text})
                        }}/>
                </View>
                <View>
                    <Text>Selecciona una imagen</Text>
                    <Picker changeImage={this.onChangeImage.bind(this)}/>
                </View>
            </View>
            <View >
                <Text>¿Deseas que sea colaborativo?</Text>
                <Switch
                    onValueChange={(value) => {
                        console.log("Colaborativo?",value);
                        this.setState({collaborative: value})}} style={{marginBottom: 10}} value={this.state.collaborative} />
            </View>
            <View>
                <Text>Tiempos</Text>
                <View>
                    <TextInput placeholder="Tiempo (entrada,postre)"/>
                    <View>
                        <Text>Recetas</Text>
                        <Button title="Agregar receta"
                            onPress={()=>{ console.log("Presiono agregar receta")}}/>
                    </View>
                </View>
            </View>
            <View>
                <Button onPress={()=>{var dump = this.dumpState(menuItems,this.state)
                    console.log(dump)
                    api.postMenu(dump)
                }} title="Guardar"/>
            </View>
        </ScrollView>
        );
    }
}




const singlemenu = ({navigation}) =>{
    console.log(navigation);
    //console.log(props.navigation);
    this.props = navigation;
    console.log(this.props);
    const menu = navigation.state.params;
    return(
        <ScrollView>
            <View>
                <Text style={estilosMenu.titulo}>{menu.title}</Text>
                <Image style={{width:350, height:350}}
                    source={menu.images[0]}/>
                <Text style={estilosMenu.titulo}>{menu.description}</Text>
            </View>
            <View>
                <Text>¿Es colaborativo?</Text>
                <Switch value={menu.collaborative}/>
            </View>
            <View>
                <Text>Entradas</Text>
                <Text>{menu.entries}</Text>
            </View>

        </ScrollView>
    );
}

class Singlemenu extends Component {
    static navigationOptions = {
        title: "single menu",
    };
    render(){
        console.log(this.props);
        return(
            singlemenu(this.props)
        );
    }
}

var menuList = [
    {
    id: 'men1',
    title: 'Cena romantica',
    image: require('../imagenes/fresas.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven partidas en cuartos, bañadas con crema de leche batida',
    owner: 'tlmsn',
    pool: [],
    isPublic: true,
    tiempo: [{
        recetas:[],
    }],
    },
    {
    id: 'men2',
    name: 'Lasaña',
    image: require('../imagenes/lasana.jpg'),
    description: 'La lasaña es un tipo de pasta, que tiene pasta en láminas intercaladas con carne ',
    owner: 'tlmsn',
    pool: [],
    isPublic: true,
    tiempo: [{
        recetas:[],
    }],
    },
    {
    id: 'men3',
    name: 'Camarones al ajillo',
    image: require('../imagenes/camaronesajillo.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven en cuartos, bañadas con crema de leche batida',
    owner: 'epura',
    pool: [],
    isPublic: true,
    tiempo: [{
        recetas:[],
    }],
    }
];

var estilosMenu = StyleSheet.create({
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        width: 400,
        marginBottom: 10
    },
    descripcion: {
        marginBottom: 20,
        width: 400
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fafafa",
    },
});


export default {Menus, singlemenu,  Singlemenu, Newmenu};
