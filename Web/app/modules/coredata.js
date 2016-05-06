/*UserData fetcher*/
var ref = require('firebase');
ref = new Firebase("https://shining-torch-4767.firebaseio.com");
import Store from 'react-native-store';


//database name and constant for storing data
const DB = {
  'user': Store.model("user"),
  'player': Store.model("player")
}

function fetchPlayer(playerid) {
  return new Promise(function (resolve) {
    ref.child('player').child(playerid).on("value", function() {
      resolve(snapshot.val());
    });
  });
}


function fetchUser(userid) {
  return new Promise(function (resolve) {
    ref.child('user').child(userid).on("value", function() {
      resolve(snapshot.val());
    });
  });
}


function loadCore(userid) {
  var user;
  var player;
  fetchUser().then(function (value) {
    user = value;
  }).then(function () {
    fetchPlayer(user.playerid).then(function (value) {
      player = value;
    }).then(function () {
      return {
        "user": user,
        "player": player
      };
    });
  });
}

/*Clean up script  */
function dest() {
  DB.user.destroy();
  DB.player.destroy();
}


function









module.exports = {loadCore};
