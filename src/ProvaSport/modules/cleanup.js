//cleanup.js
/* check the local data storage and see if there is a duplicate  */
/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Tournament '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'
var ref = require('firebase')
ref = new Firebase('https://shining-torch-4767.firebaseio.com')
export function unique(list) {
    var result = [];
    $.each(list, function(i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    return result;
}

/*
 * HARD reset
 * pull form DB into
 */

/*
 * AsyncStorage.getItem('user', (err, reps)=>{
 *   reps = JSON.parse(reps);
 *   Player.getPlayer(reps.playerid).then(player=>{
 *     AsyncStorage.setItem('player', JSON.stringify(player), (err, resp)=>{
 *       console.log(resp);
 *     })
 *   })
 * })
 */
 //free all players from in-game connections only one-way references to themselves
function nukePlayerConnections(){
  ref.child('player').on('value',function(snapshot){
    snapshot.forEach(function(playerdata){
      var playerobj = playerdata.val()
      playerobj.following = [];
      playerobj.matches = [];
      playerobj.teams = [];
      playerobj.tournaments = [];
      //playerdata.set(playerobj);
    })
  })
}
// if it is not the first two then nuke
function nukeData(){
  ref.child('matches').on('value',function(snapshot){
    var i = 0;
    snapshot.forEach(function(data){
      i++;
      if(i>2){
          data.remove()
      }
    })
  })
  ref.child('teams').on('value',function(snapshot){
    var i = 0;
    snapshot.forEach(function(data){
      i++;
      if(i>2){
          data.remove()
      }
    })
  })
  ref.child('tournaments').on('value',function(snapshot){
    var i = 0;
    snapshot.forEach(function(data){
      i++;
      if(i>2){
          data.remove()
      }
    })
  })
}

_setInitialPlayer: function(obj) {
  try {
    //THIS WORKS!!!
    AsyncStorage.setItem('player', JSON.stringify(obj), () => {
      AsyncStorage.getItem('player', (err, result)=>{
        //console.log("User");
        console.log(JSON.parse(result));
      });
    });
  } catch (error) {
    this._appendMessage('AsyncStorage error: ' + error.message);
  }
},
handlePlayer: function(player){
  //console.log("handleplayer")
  this._setInitialPlayer(player)
},
hardReset: function() {
  AsyncStorage.getItem('user', (err, response)=>{
    Player._GetPlayer(response.playerid, callback)
  })
}
