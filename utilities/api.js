import Base64 from './Base64'

var api = {
    getRecipes(){
        var url = "https://yomi.herokuapp.com/me/recipes";
        return fetch(url,{
            method: 'get',
            headers: {
                'Authorization': 'Basic '+Base64.btoa('admin_yomi:admin_yomi123456'),
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
    },
    getProfile(profile, onComplete){
      var url = `https://yomi.herokuapp.com/users/@${profile}/`
      return fetch(url, {
        headers: {
          'Authorization': 'Basic '+Base64.btoa('admin_yomi:admin_yomi123456'),
          'Content-Type': 'application/json'
        }
      }).then(response =>
        response.json()
        .then(data => onComplete(data))
        .then(res => {
          console.log(res.status, res.data);
        }));
    },
    getMenus(){
        var url = "https://yomi.herokuapp.com/me/menus";
        return fetch(url,{
            method: 'get',
            headers: {
                'Authorization': 'Basic '+Base64.btoa('admin_yomi:admin_yomi123456'),
                'Content-Type': 'application/json'
            }
        }).then((res) => res.json());
    },
    getTimeLine(){

    },
    postRecipe(data){
        var url = "https://yomi.herokuapp.com/recipes/";
        return fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Base64.btoa('admin_yomi:admin_yomi123456'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((resData) => {
            console.log(
                "POST response",
                "Responde body ->"+JSON.stringify(resData)
            );
        })
        .done();
    },
    postMenu(data){
        var url = "https://yomi.herokuapp.com/menus/";
        return fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': 'Basic ' + Base64.btoa('admin_yomi:admin_yomi123456'),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((res)=> res.json())
        .then((resData) => {
            console.log(
                "POST response",
                "Responde body ->"+JSON.stringify(resData)
            );
        })
        .done();
    }



};

module.exports = api
