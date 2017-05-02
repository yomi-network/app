import React, { Component } from 'react';
import { Text,
  TextInput,
  StyleSheet,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
 } from 'react-native';
import Banner from './Banner';
import MenuBar from './MenuBar';
import { getRecipeByUrl } from '../utilities/api.js';
import Recipes from './Recipes.js';
import Menus from './Menus.js';

class Options extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
      menus: [],
      active: 'all',
    };
  }

  componentDidMount() {
    var profile = this.props.navigation.state.params.profile;

    const innerRecipes = ((recipe) => {
      const newRecipes = [...this.state.recipes, recipe];
      this.setState({
        recipes: newRecipes,
      });
    }).bind(this);

    profile.recipes.map((url) => getRecipeByUrl(url, innerRecipes));

    const innerMenus = ((menus) => {
          const newMenus = [...this.state.recipes, menus];
          this.setState({
            menus: newMenus,
          });
        }).bind(this);

    profile.menus.map((url) => getRecipeByUrl(url, innerMenus));
  }

  onChange(option) {
    if (option === this.state.active) return;

    if (option === 'recipes') {
      this.setState({active: 'recipes'})
    } else if (option === 'menus') {
      this.setState({active: 'menus'})
    }
    else if (option === 'cookers') {
      this.setState({active: 'cookers'})
    } else {
      this.setState({active: 'all'})
    }
  }

  render() {
    const profile = this.props.navigation.state.params.profile;

    var elements = [];

    var recipesIcon = require('../imagenes/cook-inactive.png');
    var menusIcon = require('../imagenes/menu-inactive.png');
    var cookersIcon = require('../imagenes/cooker-inactive.png');
    var allIcon = require('../imagenes/list-inactive.png');

    if (this.state.active === 'recipes') {
      recipesIcon = require('../imagenes/cook.png');
      elements = elements.concat(Recipes.RecipeList(this.state.recipes, this.props));
    }
    if (this.state.active === 'menus') {
      menusIcon = require('../imagenes/menu.png');
      elements = elements.concat(Menus.menus(this.props, this.state.menus));
    }
    if (this.state.active === 'cookers') {
      cookersIcon = require('../imagenes/cooker.png');
    }

    if (this.state.active === 'all' ) {
      allIcon = require('../imagenes/list.png');
      elements = elements.concat(Recipes.RecipeList(this.state.recipes, this.props),
        Menus.menus(this.props, this.state.menus));
    }


    return <View>
      <View style={ postsBar.bar }>
        <TouchableOpacity onPress={() => this.onChange('all')}>
          <Image style={postsBar.image} source={ allIcon } ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChange('recipes')}>
          <Image style={postsBar.image} source={ recipesIcon }></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChange('menus')}>
          <Image style={postsBar.image} source={ menusIcon } ></Image>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.onChange('cookers')}>
        <Image style={postsBar.image} source={ cookersIcon } ></Image>
        </TouchableOpacity>
      </View>

      {elements}
    </View>;


  }
}

class User extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const profile = this.props.navigation.state.params.profile;
    const total = profile.recipes.length + profile.menus.length;

    return (
            <View style={{ flex: 1, flexDirection: 'column',
            justifyContent: 'flex-end', }}>
                <View>
                    <Banner />
                </View>
                <ScrollView style={profileStyle.background}>
                    <View style={separator}>
                        <View style={profileStyle.head}>
                          <View>
                            <Image source={ profile.picture !== undefined ?
                                profile.picture :
                                require('../imagenes/perfil.png') }
                              style={profileStyle.picture}/>
                            </View>
                            <View style={profileStyle.group}>
                            <View style={profileStyle.supergroup}>
                              <View style={profileStyle.group}>
                                <Text style={profileStyle.groupCounter}>{total}</Text>
                                <Text style={profileStyle.description}>Publica...</Text>
                              </View>
                              <View style={profileStyle.group}>
                                <Text style={profileStyle.groupCounter}>0</Text>
                                <Text style={profileStyle.description}>Seguidores</Text>
                              </View>
                              <View style={profileStyle.group}>
                                <Text style={profileStyle.groupCounter}>0</Text>
                                <Text style={profileStyle.description}>Seguiendo</Text>
                              </View>
                            </View>
                            <TouchableOpacity>
                              <Text style={profileStyle.button}>Editar mi perfil</Text>
                            </TouchableOpacity>
                          </View>
                        </View>

                        <View style={profileStyle.info}>
                            <Text style={profileStyle.title}>{profile.username}</Text>
                            <Text style={profileStyle.email}>{profile.email}</Text>
                        </View>
                    </View>
                    <Options {...this.props} ></Options>
                </ScrollView>
                <View><MenuBar navigation={this.props.navigation} active='Profile'/></View>
            </View>
        );
  }
}

var separator = {
  paddingVertical: 15,
  marginBottom: 15,
  borderBottomColor: "#F0F0F0",
  borderBottomWidth: 1
}

var profileStyle = StyleSheet.create({
  background: {
    backgroundColor: '#FAFAFA',
  },
  picture: {
    marginLeft: 15,
    marginRight: 20,
    width: 90,
    height: 90,
    borderRadius: 40,
    marginBottom: 20,
  },
  info: {
    marginLeft: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
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
    fontSize: 16,
    textAlign: 'center',
  },
  description: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#C0C0C0',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#FAFAFA',
    color: "#333",
    marginTop: 10,
    borderWidth: 2,
    borderColor: "#C0C0C0",
    borderRadius: 3,
    paddingVertical: 8,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  head: {
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
});

const postsBar = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    justifyContent: 'space-around',

  },
  image: {
        justifyContent: 'center',
        width: 30,
        height: 30,
        margin: 4,
  }
})

export default User;
