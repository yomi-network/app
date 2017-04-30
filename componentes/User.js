import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, Image, ScrollView } from 'react-native';
import Banner from "./Banner";
import MenuBar from './MenuBar';
import {getRecipeByUrl} from '../utilities/api.js';
import Recipes from './Recipes.js';

class User extends Component {
    constructor(props){
        super(props)
        this.state = {recipes: []}
    }

    componentDidMount() {
       var profile = this.props.navigation.state.params.profile;

       const inner = ((recipe) => {
         const new_recipes = [...this.state.recipes, recipe]
         this.setState({recipes: new_recipes});
       }).bind(this);

       profile.recipes.map((url) => getRecipeByUrl(url, inner));
    }

    render() {
      const profile = this.props.navigation.state.params.profile;
      const recipes = Recipes.RecipeList(this.state.recipes, this.props);
      const total = this.state.recipes.length;
        return (
            <View style={{flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end'}}>
                <View>
                    <Banner />
                </View>
                <ScrollView>
                    <View style={profileStyle.background}>
                        <View style={profileStyle.head}>
                          <View>
                            <Image source={ profile.picture !== undefined ? profile.picture : require("../imagenes/perfil.png")}
                              style={profileStyle.picture}/>
                            </View>

                            <View style={profileStyle.supergroup}>
                              <View style={profileStyle.group}>
                                <Text style={profileStyle.groupCounter}>{total}</Text>
                                <Text style={profileStyle.description}>Publicaciones</Text>
                              </View>
                              <View style={profileStyle.group}>
                                <Text style={profileStyle.groupCounter}>0</Text>
                                <Text style={profileStyle.description}>Seguidores</Text>
                              </View>
                            </View>
                        </View>
                        <View style={profileStyle.info}>
                            <Text style={profileStyle.title}>{profile.username}</Text>
                            <Text style={profileStyle.email}>{profile.email}</Text>
                        </View>
                    </View>
                      {recipes}
                </ScrollView>
                <View><MenuBar navigation={this.props.navigation} /></View>
            </View>
        );
    }
}

 var profileStyle = StyleSheet.create({
   background: {
     backgroundColor: '#FAFAFA',
     paddingVertical: 20
   },
   picture: {
     marginLeft: 15,
     width: 80,
     height: 80,
     borderRadius: 40,
     marginBottom: 10

   },
   info: {
     marginLeft: 15
   },
   title: {
     fontSize: 16,
     fontWeight: 'bold'
   },
   email: {
     fontSize: 14,
   },
   supergroup: {
     flexDirection: 'row',
   },
   group: {
     marginLeft: 10,
     marginRight: 10,
   },
   groupCounter: {
     fontWeight: 'bold',
     fontSize: 18,
     textAlign: 'center'
   },
   description: {
     fontWeight: 'bold',
     fontSize: 16,
     textAlign: 'center'
   },
   head: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',

   }

 })

export default User;
