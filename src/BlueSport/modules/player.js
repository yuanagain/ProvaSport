/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Team from '../modules/team'
import * as Tournament from '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


/*
 * WARNING: methods wait on database download before returning.
 * TODO: download actual Images instead of URLs
        (accomplished by turning pic into bitstream)

 */

/* provide module to access/update player data here */
var playerdataRef = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
playerdataRef = new Firebase("https://shining-torch-4767.firebaseio.com/player");

/*possilby add stuff like isOnTeam etc.*/
function _GetPlayer(playerid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}

/*possilby add stuff like isOnTeam etc.*/
function GetPlayer(playerid) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
}
/*
 * function enterTournment(player, playerid, tournamentid) {
 *   player.tournaments.append(torunamentid);
 *   Tournament.addPlayer(tournamentid, playerid).then(resp => if (resp){
 *     set
 *   return player;
 *
 * }
 */
function _CreatePlayer(callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        var newRef = playerdataRef.child(playerid).push("value", function(snapshot) {
          var player = snapshot.val();
          resolve(newRef.key());
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}


  var default_player = {
    "name" : {
      "first": "Loading",
      "last": "Loading",
      "full": "Loading",
    },
    "userid" : -1,
    "prof_pic": "Loading",
    "elo": 0.0,
    "earnings": [ {"sport" :
    {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
    }} ],
    "home": "LOADING",
    "sports": "LOADING",
    "imageURL": "Loading",
    "friends": [],
    "teams": [],
    "matches": [],
    "tournaments": []
  };

module.exports = {_GetPlayer, default_player};
