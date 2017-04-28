var RNDBModel = require('react-native-db-models')

//var DB = {
//    "app": new RNDBModel.create_db('app'),
//    "users": new RNDBModel.create_db('users'),
//}
//
//module.exports = DB

//import RNDBModel from 'react-native-db-models';

var DB = {
    "recipes": new RNDBModel.create_db('recipes'),
    "terms": new RNDBModel.create_db('terms'),
    "menus": new RNDBModel.create_db('menus'),
}

//export default DB;
module.exports = DB
