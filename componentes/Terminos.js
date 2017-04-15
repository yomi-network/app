import React, { Component } from 'react';
import {Text, View, StyleSheet } from 'react-native';

/*class TermRow extends Component {
    render() {
        return(
            <View>
                <Text style={styles.negritas}>Nombre del termino</Text>
                <Text>Descripcion del termino</Text>
            </View>
        )
    }
}*/

class Terms extends Component {
    render(){
        let categoriasLista = categorias
        console.log("Categorias: "+categorias)
        console.log(categorias);
        console.log("Conteneder de categorias-categoriaLista"+categoriasLista);
        console.log(CategoryList(categoriasLista));
        return (
            CategoryList(categoriasLista)
        );
    }
}

function TermList(props){
    let terms = props;
    console.log("Terminos");
    console.log(terms);
    let listTerm = terms.map((term) => {
        return(
            <View key={term.id}>
                <Text style={styles.negritas}>{term.name}</Text>
                <Text>{term.description}</Text>
            </View>
        );
    });
    return(
        <View>{listTerm}</View>
    );
}

function CategoryList(props){
    console.log("props");
    console.log(props);
    let categories = props;
    console.log(categories);
    let listCategory = categories.map((categoria) => {
        return(
            <View key={categoria.id}>
                <Text style={[styles.negritas, styles.titulo]}>{categoria.name}</Text>
                {TermList(categoria.term)}
            </View>
        );
    });
    console.log("Lista de categorias"+listCategory);
    return(
        <View>
            {listCategory}
        </View>
    );
}
//Va a mostar los terminos agrupados por
//categoria
/*
class CategoryRow extends Component {
    render() {
        var titulo = categorias[0].name
        let termino = categorias
        console.log(termino[1].name)
        console.log(titulo);
        return(
            <View>
                <Text style={[styles.negritas, styles.titulo]}>{titulo}</Text>
                <TermRow />
            </View>
        )
    }
}
*/
//va a mostrar el listado de categorias
//class categoriesContainer extends Component  {
//    render() {
//        return()
//    }
//}

//class SearchBar extends Component {
//    render() {
//        return ()
//    }
//}

/*var terms = [
    {category: 'h', name:'Aerometro', description:'Instrumento para medir la densidad'},
    {category: 't', name: 'Baño maria', description: 'Técnica que consiste en
        introducir un recipiente dentro de otro con agua a fuego constante
        calentando la preparación de un modo suave'},
    {category: 'a', name: 'Colar', description: 'Separar dos sustancias por medio
        de un paño o un cedazo'}
];*/

var categorias = [
    {
    id: 'cat1',
    name: 'Utencilio',
    term:[
        {
            id: 'term1',
            name: 'Termino 1',
            description:'Aqui debe ir la descripcion del termino 1',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term2',
            name: 'Termino 2',
            description:'Aqui debe ir la descripción del termino 2',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term3',
            name: 'Termino 3',
            description:'Aqui debe ir la descripción del termino 4',
            image: null,
            creationDate: null,
            updateDate: null
        }
    ]
    },
    {
    id: 'cat2',
    name: 'Técnica',
    term:[
        {
            id: 'term1',
            name: 'Termino 4',
            description:'Aqui debe ir la descripcion del termino 4',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term2',
            name: 'Termino 5',
            description:'Aqui debe ir la descripción del termino 5',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term3',
            name: 'Termino 6',
            description:'Aqui debe ir la descripción del termino 6',
            image: null,
            creationDate: null,
            updateDate: null
        }
    ]
    },
    {
    id: 'cat3',
    name: 'Alimento',
    term:[
        {
            id: 'term1',
            name: 'Termino 7',
            description:'Aqui debe ir la descripcion del termino 7',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term2',
            name: 'Termino 8',
            description:'Aqui debe ir la descripción del termino 8',
            image: null,
            creationDate: null,
            updateDate: null
        },
        {
            id: 'term3',
            name: 'Termino 9',
            description:'Aqui debe ir la descripción del termino 9',
            image: null,
            creationDate: null,
            updateDate: null
        }
    ]
    }
];

const styles = StyleSheet.create({
  negritas: {
    color: 'purple',
    fontWeight: 'bold'
  },
  titulo: {
      fontSize: 20
  }
});

/*Terminos = {
    CategoriesContainer
}*/

export default Terms;
