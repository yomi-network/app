import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

class Recipes extends Component {
    static navigationOptions = {
        title: 'Home',
        headerTintColor: 'pink',
    }
    render() {
        let recipes = recipeList;
        return (
            <ScrollView title="Recetas">
                {RecipeList(recipes, this.props)}
            </ScrollView>

        );
    }
}

function RecipeList(recipes, props){
    let recList = recipes.map((recipe) => {
        return(
            //<TouchableOpacity key={recipe.id}>
                <View key={recipe.id} style={{flex: 1, alignItems: 'center', borderBottomWidth: 5, borderBottomColor:'#cccccc'}}>
                    <TouchableOpacity onPress={ () => props.navigation.navigate('ShowRecipe',recipe)}>
                        <Image source={recipe.image} style={{width: 400, height: 350, marginTop:10}}/>
                    </TouchableOpacity>
                    <View>
                        <Text selectable={true}  style={estilosRecipe.titulo}>{recipe.name}</Text>

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

const singleRecipe = ({navigation}) =>{
    //console.log(navigation);
    const recipe = navigation.state.params;
    return(
        <ScrollView>
            <Text style={estilosRecipe.titulo}>
                {recipe.name}
            </Text>
            <Image source={recipe.image}/>
            <Text style={estilosRecipe.titulo}>
                {recipe.description}
            </Text>
        </ScrollView>
    );
}
singleRecipe.navigationOptions = props => {
    console.log(props);
    const {navigation} = props;
    const {state, setParams} = navigation;
    const {params} = state;
    //console.log(params);
    return{
        title: "algo",
        headerTintColor: '#ccc'
    }
}

var recipeList = [
    {
    id: 'rec1',
    name: 'Fresas con crema',
    image: require('../imagenes/fresas.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven partidas en cuartos, bañadas con crema de leche batida',
    tags: ['postre', 'merienda', 'dulce', 'facil'],
    reactions:[
        {
            id: 'rea1',
            name: 'love',
            description:'Reaccion 1',
            image: null,
            count: null
        },
        {
            id: 'rea2',
            name: 'like',
            description:'Reaccion 2',
            image: null,
            count: null
        },
        {
            id: 'rea3',
            name: 'sad',
            description:'Reaccion 3',
            image: null,
            count: null
        }
    ]
    },
    {
    id: 'rec2',
    name: 'Lasaña',
    image: require('../imagenes/lasana.jpg'),
    description: 'La lasaña es un tipo de pasta, que tiene pasta en láminas intercaladas con carne ',
    tags: ["postre", "merienda", "dulce", "facil"],
    reactions:[
        {
            id: 'rea1',
            name: 'love',
            description:'Reaccion 1',
            image: null,
            count: null
        },
        {
            id: 'rea2',
            name: 'like',
            description:'Reaccion 2',
            image: null,
            count: null
        },
        {
            id: 'rea3',
            name: 'sad',
            description:'Reaccion 3',
            image: null,
            count: null
        }
    ]
    },
    {
    id: 'rec3',
    name: 'Camarones al ajillo',
    image: require('../imagenes/camaronesajillo.jpg'),
    description: 'Fresas con crema es un postre en fresas que se sirven en cuartos, bañadas con crema de leche batida',
    tags: ["postre", "merienda", "dulce", "facil"],
    reactions:[
        {
            id: 'rea1',
            name: 'love',
            description:'Reaccion 1',
            image: null,
            count: null
        },
        {
            id: 'rea2',
            name: 'like',
            description:'Reaccion 2',
            image: null,
            count: null
        },
        {
            id: 'rea3',
            name: 'sad',
            description:'Reaccion 3',
            image: null,
            count: null
        }
    ]
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


export default {Recipes, singleRecipe};
