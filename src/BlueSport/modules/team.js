/*
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Tournament from '../modules/tournament'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'

var teamdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
teamdb = new Firebase("https://shining-torch-4767.firebaseio.com/team");
/*possilby add stuff like isOnTeam etc.*/

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
    }).catch(function(){
      console.log("Failed");
    });
}
function getTeam(teamid) {
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

function addPlayer(teamid, playerid) {
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

function addMatch(teamid, matchid) {
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
  }).catch(function(){
    console.log("Failed to add match to team");
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
  }).catch(function(){
    console.log("Failed to add match to team");
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
          console.log("Data CREATED successfully createT "+ newRef.key());
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
      callback(value)
    }).catch(function(error) {
      console.log("Something went wrong in _CreateTeam"+ error)
    });
}

var default_team = {
    "name": "Loading",
    "players": [],
    "matches": [],
    "thumbnail": "http://cdn.xl.thumbs.canstockphoto.com/canstock16117908.jpg"
};

var bye = {
    "name": "BYE ",
    "players": [],
    "matches": [],
    "teamid": 0,
    "thumbnail": " "
};

module.exports = {_GetTeam, default_team, bye, _CreateTeam, createTeam, _SetTeam,
   getTeam, addMatch, _AddMatch, addPlayer, _AddPlayer};
