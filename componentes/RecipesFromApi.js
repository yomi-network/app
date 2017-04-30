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
  ListView
} from 'react-native';
import api from '../utilities/api';
import {StackNavigator} from 'react-navigation';
import DB from './DB';
import Picker from './ImagePicker';
import Banner from './Banner';
import MenuBar from './MenuBar';
var DBEvents = require('react-native-db-models').DBEvents



const onButtonPress = () => {
    Alert.alert("El boton ha sido presionado");
}

const get_recipes = () => {
    DB.recipes.get_all(function(result){
        console.log(result);
    })
}


class Recipes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipeList: [],
        };
    }
    static navigationOptions = {
            title: 'Mis recetas',
            headerRight: "algo",
    };

    componentWillMount() {
        api.getRecipes().then((res) => {
            console.log(res);
            this.setState({
                recipeList: res
            })
        })
    }
    render(){
        console.log("Recetas: ", this.state.recipeList.results);
        if ( this.state.recipeList.results === undefined || this.state.recipeList.results === null){
            return this.renderLoadingView(this.props);
        }else if(this.state.recipeList.results.length == 0){
            return renderEmptyView(this.props)
        }else {
            return recipes(this.props, this.state.recipeList.results)
        }

    }
    renderLoadingView(props) {
        console.log("renderLoadingView ",props);
        p = props;
        return (
            <View style={estilosRecipe.container}>
                <Text>Cargando ... </Text>
                <Image style={{width: 48, height: 48}}
                    source={require("../imagenes/egg48x48.png")} />
            </View>
        );
    }
    renderEmptyView(props) {
        console.log("renderEmptyView ",props);
        p = props;
        return (
            <View>
                <Text> Todavia no tienes ningúna receta </Text>
                <Button title="Crea una" onPress={
                        (p) => {
                            console.log(p)
                            props.navigate('NewRecipe')}}/>
            </View>
        );
    }
}


/*/function recipes (recipeList) {
    let recipes = recipeList;
    console.log("recipes",recipes);
    return (
                    {RecipeList(recipes)}

    );
}*/

function recipes(props,recipes){
    console.log("Dentro de recipes",recipes);
    console.log("Dentro de recipes",props);
    console.log("Dentro de recipes-> Primera imagen de la segunda receta", recipes[1].images[0]);
    let recList = recipes.map((recipe, i) => {
        return(
            //<TouchableOpacity key={recipe.id}>
                <View key={i}>
                    <TouchableOpacity onPress={ () => props.navigation.navigate('ShowRecipe',recipe)}>
                    {recipe.images[0] === undefined ? <Image source={require('../imagenes/no_image.png')}
                        style={{width: 400, height: 350, marginTop:10}}/> : <Image source={{uri: recipe.images[0]}}
                            style={{width: 400, height: 350, marginTop:10}}/>}
                    </TouchableOpacity>
                    <View>
                        <Text selectable={true}  style={estilosRecipe.titulo}>{recipe.title}</Text>

                        <Text selectable={true} style={estilosRecipe.descripcion}>{recipe.description}</Text>

                    </View>
                </View>
            //

        );
    });
    return(
        <ScrollView showsHorizontalScrollIndicator={false} horizontal={true}>{recList}</ScrollView>
    );
}

class NewRecipe extends Component {
    constructor(props){
        super(props);
        console.log("Props desde New recipe", props);
        this.state = {
            title: '',
            description: '',
            ingredients: [],
            steps: [],
            images: [],
            portions: 0,
            cost: 0.0,
        }
    }
    static navigationOptions = {
        title: 'Nueva receta',
    }
    onChangeImage(data){
        console.log(data)
        this.setState({
            images: this.state.images.concat(data)
        })
        console.log("Images", this.state.images);
    }
    render(){
        console.log("This props desde renderNewRecipe",this.props);
        return(
            <View style={{flex: 1}}>
                <View><Banner/></View>
                <ScrollView >
                    <View>
                        <Text style={estilosRecipe.subtitulo}>Información básica</Text>
                        <TextInput
                            onChangeText={(text) => this.setState({title: text})}
                            placeholder="Nombre de la receta"/>
                        <TextInput
                            style={{height:80}}
                            placeholder="Descripción"
                            onChangeText={(text) => this.setState(
                                    {description: text})}/>
                        <Picker changeImage={this.onChangeImage.bind(this)}/>
                    </View>
                    <View>
                        <Text style={estilosRecipe.subtitulo}>Porciones</Text>
                        <TextInput
                            placeholder="¿Para cuantas personas alcanza?"
                            onChangeText = {(text) => this.setState(
                                {portions: text})}/>
                        <TextInput
                            placeholder="Costo aproximado"
                            onChangeText = {(text) => this.setState(
                                {cost: text})}/>
                    </View>
                    <View>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                            <Text style={estilosRecipe.subtitulo}>Ingredientes</Text>
                            <Button
                                title="Más"
                                onPress={()=>{
                                    console.log("this state:", this.state);
                                    api.postRecipe(this.state)}} />
                        </View>

                        <TextInput
                            placeholder="Ingrediente 1"
                            onChangeText = {(text) => this.setState(
                                {ingredients: text})}/>
                        <TextInput
                            placeholder="Ingrediente 2"
                            onChangeText = {(text) => this.setState(
                                {ingredients: text})}/>
                    </View>
                    <View>
                        <Text style={estilosRecipe.subtitulo}>Modo de preparación</Text>
                        <TextInput
                            placeholder="Paso 1"
                            onChangeText = {(text) => this.setState(
                                {steps: text})}/>
                        <TextInput
                            placeholder="Paso 2"
                            onChangeText = {(text) => this.setState(
                                {steps: text})}/>
                    </View>
                </ScrollView>
                <View>
                    <MenuBar navigation={this.props}/>
                </View>
            </View>
        );
    }
}




const singleRecipe = (props) =>{
    //console.log(navigation);
    console.log("En singleRecipe",props.navigation);
    const navigation = props.navigation;
    const recipe = navigation.state.params;
    const ingredients = recipe.ingredients;
    const steps = recipe.steps;
    console.log(recipe.images[0]);
    let ingredientList = ingredients.map((ingredient, i) => {
        return(
            <Text style={estilosRecipe.item} key={i}>{ingredient}</Text>
        );
    });
    let stepsList = steps.map((step, i) => {
        return(
            <Text style={estilosRecipe.item} key={i}>{step}</Text>
        );
    });
    return(
        <View style={{flex: 1}}>
            <View style={{flex: 1}}><Banner/></View>
            <View style={{flex: 5}}>
        <ScrollView>
            <View>
                {recipe.images[0] === undefined ? <Image source={require('../imagenes/no_image.png')}
                style={{width: 400, height: 350, marginTop:10}}/> : <Image source={{uri: recipe.images[0]}}
                    style={{width: 400, height: 350, marginTop:10}}/>}

                <Text style={estilosRecipe.titulo}>{recipe.title}</Text>

                <Text style={estilosRecipe.description}>{recipe.description}</Text>
            </View>
            <View>
                <Text style={estilosRecipe.subtitulo}>Ingredientes</Text>
                {ingredientList}
            </View>
            <View>
                <Text style={estilosRecipe.subtitulo}>Preparacion</Text>
                {stepsList}
            </View>

        </ScrollView>
    </View>
        </View>
    );
}

class SingleRecipe extends Component {
    static navigationOptions = {
        title: "single recipe",
    };
    render(){
        console.log("En sigleRecipe class",this.props);
        return(
            singleRecipe(this.props)
        );
    }
}


var estilosRecipe = StyleSheet.create({
    titulo: {
        fontSize: 25,
        fontWeight: 'bold',
        width: 400,
        marginBottom: 10
    },
    subtitulo: {
        fontSize: 20,
        fontWeight: 'bold',
        width: 400,
        marginTop: 10
    },
    descripcion: {
        fontSize: 20,
        marginBottom: 20,
        width: 400
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#fafafa",
    },
    item: {
        textAlign: 'justify',
        height: 40,
        width: -1,
        marginLeft: 20,
    },
    round: {
        borderRadius: 75,
        width: 50,
        height: 50
    }
});


export default {Recipes, singleRecipe,  SingleRecipe, NewRecipe};
