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
    componentWillMount() {
        api.getRecipes().then((res) => {
            console.log(res);
            this.setState({
                recipeList: res
            })
        })
    }

    render(){
        console.log("Recipes: ", this.state.recipeList);
        if ( !this.state.recipeList.results ) {
            return this.renderLoadingView();
        }else {
            return recipes(this.props,this.state.recipeList.results)
        }

    }
    renderLoadingView() {
        return (
            <View>
                <Text> Loading recipes... </Text>
            </View>
        );
    }
    renderRecipe(props){
        return (
            singleRecipe(props)
        );
    }
}


function recipes (props, recipeList) {
    let recipes = recipeList;
    console.log("recipes",recipes);
    console.log(props);
    return (
        <View style={{flex: 14}}>
            <View>
                <ScrollView title="Recetas">
                    {RecipeList(recipes, props)}
                </ScrollView>
            </View>

            <View style={{flex: 1}}>
                <Button
                    style={{position: 'absolute', marginTop: 50}}
                    onPress={ () => props.navigation.navigate('NewRecipe',{id: 'rec5'})}
                    title="Crear una receta" />
            </View>
        </View>
    );
}

function RecipeList(recipes, props){
    console.log(props);
    let recList = recipes.map((recipe, i) => {
        return(
            //<TouchableOpacity key={recipe.id}>
                <View key={i} style={{flex: 1, alignItems: 'center', borderBottomWidth: 5, borderBottomColor:'#cccccc'}}>
                    <TouchableOpacity onPress={ () => props.navigation.navigate('ShowRecipe',recipe)}>
                        <Image
                            source={{uri:recipe.images[0]}}
                            style={{width: 400, height: 350, marginTop:10}}/>
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
        <View>{recList}</View>
    );
}

class NewRecipe extends Component{
    constructor(props){
        super(props);
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
        console.log(this.props);
        return(
            <ScrollView style={{flex:0}}>
            <View>
                <Text>Información básica</Text>
                <TextInput
                    onChangeText={(text) => this.setState({title: text})}
                    placeholder="Nombre de la receta"/>
                <TextInput
                    style={{height:50}}
                    placeholder="Descripción"
                    onChangeText={(text) => this.setState(
                        {description: text})}/>
                    <Picker changeImage={this.onChangeImage.bind(this)}/>
            </View>
            <View>
                <Text>Porciones</Text>
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
                    <Text>Ingredientes</Text>
                    <Button
                        style={{width:60}}
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
                <Text>Modo de preparación</Text>
                <TextInput
                    placeholder="Paso 1"
                    onChangeText = {(text) => this.setState(
                        {steps: text})}/>
                <TextInput
                    placeholder="Paso 2"
                    onChangeText = {(text) => this.setState(
                        {steps: text})}/>
            </View>
            <View>
                <Button onPress={()=>{
                    console.log("this state:", this.state);
                    }} title="Guardar"/>
            </View>
        </ScrollView>
        );
    }
}




const singleRecipe = (props) =>{
    //console.log(navigation);
    console.log(props.navigation);
    const navigation = props.navigation;
    const recipe = navigation.state.params;
    const ingredients = recipe.ingredients;
    const steps = recipe.steps;
    console.log(recipe.images[0]);
    let ingredientList = ingredients.map((ingredient, i) => {
        return(
            <Text key={i}>{ingredient}</Text>
        );
    });
    let stepsList = steps.map((step, i) => {
        return(
            <Text key={i}>{step}</Text>
        );
    });
    return(
        <ScrollView>
            <View>
                <Image source={{uri: recipe.images[0]}}
                    style={{width: 400, height: 350, marginTop:10}}/>
                <Text style={estilosRecipe.titulo}>{recipe.title}</Text>

                <Text style={estilosRecipe.titulo}>{recipe.description}</Text>
            </View>
            <View>
                <Text>Ingredientes</Text>
                {ingredientList}
            </View>
            <View>
                <Text>Preparacion</Text>
                {stepsList}
            </View>

        </ScrollView>
    );
}

class SingleRecipe extends Component {
    static navigationOptions = {
        title: "single recipe",
    };
    render(){
        console.log(this.props);
        return(
            singleRecipe(this.props)
        );
    }
}

/*singleRecipe.navigationOptions =  (props) => {
    console.log("imprime algo");
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    console.log(params);
    title: "algo";
    }*/
//singleRecipe.navigationOptions = {
    //title: "Receta solita"+imprime(this.navigation),
//    headerVisible: false,
//}

//singleRecipe.navigationOptions = ({navigation}) => ({
//    title: "Receta solita"+imprime(navigation.state.params.name),
//});


var recipeList = [
    {
    id: 'rec1',
    name: 'Fresas con crema',
    image: require('../imagenes/fresas.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven partidas en cuartos, bañadas con crema de leche batida',
    owner: 'tlmsn',
    ingredients: [
        "1 kg de fresas",
        "250 gr de crema",
        "1 pizca de azucar",
    ],
    steps: [
        "picar",
        "sazonar",
        "disfrutar",
    ],
    },
    {
    id: 'rec2',
    name: 'Lasaña',
    image: require('../imagenes/lasana.jpg'),
    description: 'La lasaña es un tipo de pasta, que tiene pasta en láminas intercaladas con carne ',
    owner: 'tlmsn',
    ingredients: [
        "1 kg de carne de res",
        "1/2 kg de jitomate",
        "1 cda de sal",
        "1 diente de ajo",
    ],
    steps: [
        "picar",
        "rayar",
        "sazonar",
        "disfrutar",
    ],
    },
    {
    id: 'rec3',
    name: 'Camarones al ajillo',
    image: require('../imagenes/camaronesajillo.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven en cuartos, bañadas con crema de leche batida',
    owner: 'epura',
    ingredients: [
        "1 kg de camarones",,
        "1 1/2 cda de sal",
        "10 dientes de ajo",
    ],
    steps: [
        "picar",
        "rayar",
        "sazonar",
        "disfrutar",
    ],
    }
];

var estilosRecipe = StyleSheet.create({
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
        borderTopColor: 'red'
    },
});


export default {Recipes, singleRecipe,  SingleRecipe, NewRecipe};
