/* TODO:
* posibly need to export more things
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from './player'
import * as Tournament from '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'

var teamdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
teamdb = new Firebase("https://shining-torch-4767.firebaseio.com/team");
/*possibly add stuff like isOnTeam etc.*/

function _GetTeam(teamid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        teamdb.child(teamid).on("value", function(snapshot) {
          var team = snapshot.val();
          resolve(team);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(err){
      console.log("Failed  "+ err);
    });
}
export function getTeam(teamid) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
        teamdb.child(teamid).on("value", function(snapshot) {
          var team = snapshot.val();
          resolve(team);
        });
     });
}

function updatePlayers(teamid, playerArray) {
  teamdb.child(teamid).update({
    "players": playerArray,
  })
}

function updateMatches(teamid, matchArray) {
  teamdb.child(teamid).update({
    "matches": matchArray,
  })
}

export function addPlayer(teamid, playerid) {
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players = snapshot.val();
        resolve(players);
      });
   });
  promise.then(function(list){
    list.push(playerid);
    teamdb.child(teamid).child('players').set(list)
  }).catch(function(){
    console.log("Failed to add player to team");
  });
}

export function addMatch(teamid, matchid) {
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        if (matches)
          matches.push(matchid);
        else {
          matches = [matchid];
        }
        resolve(matches);
      });
   });
  promise.then(function(list){
    /*INPUT STOCK DATA TODO*/
    //list.push(1);

    teamdb.child(teamid).child('matches').set(list)
    //add to players
  }).catch(function(err){
    console.log("Failed to add match to team "+teamid+ "   "+matchid + "\n" + err);
  });
}

function _AddPlayer(teamid, playerid, callback) {
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players = snapshot.val();
        resolve(players);
      });
   });
  promise.then(function(list){
    list.push(playerid);
    teamdb.child(teamid).child('players').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed to add player to team");
  });
}

function _AddMatch(teamid, matchid, callback) {
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    teamdb.child(teamid).child('matches').set(list)
    callback(list)
  }).catch(function(err){
    console.log("Failed to add match to team\n" + err);
  });
}

function _SetTeam(obj, teamid, callback) {
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data saved successfully.");
          resolve(obj);
        }
      });
    });
  promise.then(function(value){
    callback(value);
  }).catch(function(){
    console.log("Team set Failed");
  });
}

/* needs and object for th full data of a team fields
  */
function createTeam(obj) {
  return new Promise(function(resolve, reject) {
      var newRef = teamdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          var key = newRef.key();
          console.log("Data CREATED successfully createT "+ newRef.key());
          [obj.players].forEach(function(playerid){
            Player.addTeam(playerid, key)
          });
          resolve(newRef.key());
        }
      });
    });
}

function _CreateTeam(obj, callback) {
  var promise = new Promise(function(resolve, reject) {
      var newRef = teamdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully _CreateT "+ newRef.key());
          resolve(newRef.key());
        }
      });
    })
    promise.then(function (value) {
      //console.log("\n\n"+Player.default_player)
      [0,1].forEach(function(playerid){
        Player.addTeam(playerid, value)
      });
      callback(value)
    }).catch(function(error) {
      console.log("Something went wrong in _CreateTeam"+ error)
    });
}

export function addTeamPlayersToMatch(teamid, matchid) {
  return new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players.concat(snapshot.val())
        if (players) {
          players.forEach(function(playerid){
            Player.addMatch(playerid, matchid)
          })
        }
        resolve(true);
      });
   });
}
/*returns which team the player is on*/
export function teamOneorTwo(team0id, playerid) {
  return new Promise(function(resolve){
    getTeam(team0id).then(resp=>{
      if(inArray(playerid, resp.players))
        resolve(0);
      else
        resolve(1);
    });
  })
}
//returns true if on team and false if not on either team
export function onTeams(teamid1, teamid2, playerid) {
  return new Promise(function(resolve){
    getTeam(teamid1).then(function(value){
      getTeam(teamid2).then(function(resp) {
        if (inArray(playerid, value.players) || inArray(playerid, resp.players)){
          resolve(true);
        }
        else{
          resolve(false);
        }
      })
    })
  })
}
//posibly move to ctools
function inArray(value, array) {
  return array.indexOf(value) > -1;
}

var TBD = {
    "name": "TBD",
    "players": [],
    "matches": [],
    "teamid": 0,
    "thumbnail": ""
};


var default_team = {
    "name": "Loading",
    "players": [],
    "matches": [],
    "thumbnail": "http://cdn.xl.thumbs.canstockphoto.com/canstock16117908.jpg"
};

var bye = {
    "name": "BYE",
    "players": [],
    "matches": [],
    "teamid": 0,
    "thumbnail": ""
};
/* used for setting the TBD and BYE teams in case fields change
 * _SetTeam(bye, 'BYE', function(resp){console.log("SET BYE")})
 * _SetTeam(TBD, 'TBD', function(resp){console.log("SET TBD")})
 */
module.exports = {_GetTeam, default_team, bye, _CreateTeam, createTeam, _SetTeam,
   getTeam, addMatch, _AddMatch, addPlayer, _AddPlayer, addTeamPlayersToMatch, teamOneorTwo, onTeams};
