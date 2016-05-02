/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


var tourndb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
tourndb = new Firebase("https://shining-torch-4767.firebaseio.com/tournament");
/*player object within Player class*/
//make update or remove team, etc.

/* needs and object for th full data of a team fields
  */
function createTournament(obj) {
  return new Promise(function(resolve, reject) {
      var newRef = tourndb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          //bind team to tourn
          obj.teams.forEach(function(teamid) {
            Team.getTeam(teamid).then(function(team){
              team.players.forEach(function(playerid){
                Player.addTournament(playerid, newRef.key())
              });
            });
          });
          resolve(newRef.key());
        }
      });
    });
}

function _CreateTournament(obj, callback) {
  var promise = new Promise(function(resolve, reject) {
      var newRef = tourndb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          resolve(newRef.key());
        }
      });
    }).then(function (value) {
      // add all matchid to players
      //matches already bound by tournamentid
      //bind team's players to tourn
      obj.teams.forEach(function(teamid) {
        Team.getTeam(teamid).then(function(team){
          team.players.forEach(function(playerid){
            Player.addTournament(playerid, value)
          });
        });
      });
      callback(value)
    }).catch(function() {
      console.log("Something went wrong in _CreateTeam")
    });
}

function _GetTournament(tournamentid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        tourndb.child(tournamentid).on("value", function(snapshot) {
          var tournament = snapshot.val();
          if(!tournament.hasOwnProperty('teams')){
            tournament.teams = [];
          }
          if(!tournament.hasOwnProperty('dates')){
            tournament.dates = [];
          }
          if(!tournament.hasOwnProperty('matches')){
            tournament.matches = [];
          }
          resolve(tournament);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
function getTournament(tournamentid) {
  /* var match = new Match(matchid); */
  return new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).on("value", function(snapshot) {
        var tournament = snapshot.val();
        if(!tournament.hasOwnProperty('teams')){
          tournament.teams = [];
        }
        if(!tournament.hasOwnProperty('dates')){
          tournament.dates = [];
        }
        if(!tournament.hasOwnProperty('matches')){
          tournament.matches = [];
        }
        resolve(tournament);
      });
   });
}

function setTournament(tournamentid, obj) {
  /* var match = new Match(matchid); */
  return new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).set(obj, function(error) {
        if (error) {
          console.log("Tourn could not be saved." + error);
          reject();
        } else {
          console.log("Tourn saved successfully.");
          resolve(obj);
        }
      });
   });
}
  var default_tournament =
  {
      "type": "Loading",
      "teams": [], //alphabetical list of teams or sorted by priority
      "location": "Loading", /*tuple of  Latitude and Longitude*/
      "dates": [],
      "name": "",
      "sport": "Loading",
      "matches": [],
      "creator": "pid"
  };
/*
 * function makeTournament(matches, teams, location, type){
 *  var newTourn = $.extend( true, {}, default_tournament);
 *  newTourn.matches = matches;
 *  newTourn.teams = teams;
 *  newTourn.location = location;
 *  newTourn.type = type;
 *  return createTournament(newTourn);
 * }
 */

function addTeam(tournamentid, teamid) {
  var promise = new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        if (teams === null){
          resolve([])
        }
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    tourndb.child(tournamentid).child('teams').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}

function addMatches(tournamentid, matchid) {
  var promise = new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        if (matches === null){
          resolve([])
        }
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    tourndb.child(tournamentid).child('matches').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}

function _AddTeam(tournamentid, teamid, callback) {
  var promise = new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        if (teams === null){
          resolve([])
        }
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    tourndb.child(tournamentid).child('teams').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}

function _AddMatches(tournamentid, matchid, callback) {
  var promise = new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        if (matches === null){
          resolve([])
        }
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    tourndb.child(tournamentid).child('matches').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}



module.exports = {_GetTournament, getTournament, setTournament, default_tournament,
   addTeam, addMatches, _AddMatches, _AddTeam, createTournament, _CreateTournament};
