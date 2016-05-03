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
  console.log("_GetTeam  "+teamid);
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        teamdb.child(teamid).on("value", function(snapshot) {
          var team = snapshot.val();
          if(team === null){
            resolve(default_team)
          }
          else {
            if(!team.hasOwnProperty('players')){
              team.players = [];
            }
            if(!team.hasOwnProperty('matches')){
              team.matches = [];
            }
            resolve(team);
          }
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(err){
      console.log("Failed to _GetTeam  "+ err);
    });
}
export function getTeam(teamid) {
  console.log("getTeam");
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
        teamdb.child(teamid).on("value", function(snapshot) {
          var team = snapshot.val();
          if(team === null){
            resolve(TBD)
          }
          else {
            if(!team.hasOwnProperty('players')){
              team.players = [];
            }
            if(!team.hasOwnProperty('matches')){
              team.matches = [];
            }
            resolve(team);
          }
        });
     });
}
//getTeam("BYE").then(resp=>{console.log(resp)})
function updatePlayers(teamid, playerArray) {
  teamdb.child(teamid).update({
    "players": playerArray,
  })
}

function setProfPic(teamid, url) {
  teamdb.child(teamid).update({
    "thumbnail": url,
  })
}
//setProfPic("-KGnxwNWvzMWyXZD438Q","http://img02.deviantart.net/5e42/i/2007/011/7/1/kitten_stock___looking_scared_by_gracies_stock.jpg")
function setName(teamid, name) {
  teamdb.child(teamid).update({
    "name": name,
  })
}
//setName("-KGnxwNWvzMWyXZD438Q", "Mr. Jenkins")

function updateMatches(teamid, matchArray) {
  teamdb.child(teamid).update({
    "matches": matchArray,
  })
}

export function addPlayer(teamid, playerid) {
  console.log("addPlayer");
  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players = snapshot.val();
        //corner case handling
        if(players === null){
          resolve([])
        }
        resolve(players);
      });
   });
  promise.then(function(list){
    list.push(playerid);
    teamdb.child(teamid).child('players').set(list)
  }).catch(function(){
    console.log("Failed to add player "+playerid+" to team "+teamid);
  });
}

/*

  @params: teamid of Team object adding match
  TODO ADD MATCHES TO PlAYERS TOO
  */
export function addMatch(teamid, matchid) {
  console.log("addMatch");
  return new Promise(function(resolve, reject) {
      teamdb.child(teamid).on("value", function(snapshot) {
        var matches = []
        var team = snapshot.val();
        if (team.hasOwnProperty('matches')) {
          matches = team.matches;
        }
        //corner case handling
        if(team === null){
          //tie each to player
          console.log("ERROR NO TEAM FOUND WITH ID: "+teamid);
        }
        else {
          team.players.forEach(function(playerid){
            Player.addMatch(playerid, matchid)
          });
          matches.push(matchid);
          console.log("Added match: "+matches+" to team "+teamid+" with players "+team.players)
          matches = unique(matches);
          resolve(matches);
        }
      });
   }).then(function(list){
    teamdb.child(teamid).child('matches').set(list)
  }).catch(function(err){
    console.log("Failed to add match to team "+teamid+ "   "+matchid + "\n" + err);
  });
}
export function addTournament(teamid, tournid) {
  //console.log("addTourn");
  return new Promise(function(resolve, reject) {
      teamdb.child(teamid).on("value", function(snapshot) {
        var team = snapshot.val();
        team.players.forEach(function(playerid){
          Player.addTournament(playerid, tournid)
        });
        resolve(true);
      });
   }).catch(function(err){
    console.log("Failed to add tournament to team "+teamid+ "   "+tournid + "\n" + err);
  });
}
function unique(list) {
  return list.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
}
var findOne = function (haystack, arr) {
    return arr.some(function (v) {
        return haystack.indexOf(v) >= 0;
    });
};


function _AddPlayer(teamid, playerid, callback) {

  var promise = new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players = snapshot.val();
        if(players == null){
          resolve([])
        }
        else {
          resolve(players);
        }
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
  console.log("_ADDMatch");
  var promise = new Promise(function(resolve, reject) {
    teamdb.child(teamid).on("value", function(snapshot) {
      var matches = []
      var team = snapshot.val();
      matches = team.matches;
      //corner case handling
      if(matches === null){
        //tie each to player
        team.players.forEach(function(playerid){
          Player.addTeam(playerid, matchid)
        });
        resolve([]);
      }
      else {
        team.players.forEach(function(playerid){
          Player.addTeam(playerid, matchid)
        });
        resolve(matches);
      }
    });
 }).then(function(list){
    list.push(matchid);
    teamdb.child(teamid).child('matches').set(list)
    callback(list)
  }).catch(function(err){
    console.log("Failed to add match to team\n" + err);
  });
}
//make sure updated with current data and not new object
function _SetTeam(obj, teamid, callback) {
  console.log("_SetTeam");
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
  console.log("create");
  return new Promise(function(resolve, reject) {
      var newRef = teamdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          var key = newRef.key();
          console.log("Data CREATED successfully createT "+ newRef.key());
          // connect the player to the team
          Player.GetPlayer(obj.players[0]).then(playerobj=>{
              obj.thumbnail = playerobj.prof_pic;
              obj.name = playerobj.name.full;
              setProfPic(newRef.key(), playerobj.prof_pic);
              setName(newRef.key(), playerobj.name.full);
              resolve(newRef.key());
          })
          obj.players.forEach(function(playerid){
            Player.addTeam(playerid, key)
          });
        }
      });
    });
}

function _CreateTeam(obj, callback) {
  console.log("_Create");
  console.log("SETTING PROFPIC");
  //Player.GetPlayer(obj.players[0]).then(resp=>{obj.thumbnail=resp.prof_pic;})
  var promise = new Promise(function(resolve, reject) {
      var newRef = teamdb.push();

      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully _CreateT "+ newRef.key());
          Player.GetPlayer(obj.players[0]).then(playerobj=>{
              obj.thumbnail = playerobj.prof_pic;
              obj.name = playerobj.name.full;
              setProfPic(newRef.key(), playerobj.prof_pic);
              setName(newRef.key(), playerobj.name.full);
              resolve(newRef.key());
          })
        }
      });

    /*
     * }).then(tid=>{
     *   Player.GetPlayer(team.players[0]).then(resp=>{
     *     Team.setProfPic(tid, resp.prof_pic);
     *     Team.setName(tid, resp.name.full);
     *   })
     *   return Promise.resolve(tid);
     */
    })
    promise.then(function (value) {
      //connect player to team
      //Player.GetPlayer(obj.players[0]).then(resp=>{obj.thumbnail=resp.prof_pic})
      obj.players.forEach(function(playerid){
        Player.addTeam(playerid, value)
      });
      callback(value)
    }).catch(function(error) {
      console.log("Something went wrong in _CreateTeam"+ error)
    });
}
function createFromList(teamobjlist, callback) {
  //console.log("cFromList");
  return new Promise(function (resolve) {
    var teamids = []
    var i = 0;

    teamobjlist.forEach(function(teamobj){
      createTeam(teamobj).then(resp=>{
        /*
         * Player.GetPlayer(teamobj.players[0]).then(response=>{
         *   Team.setProfPic(tid, response.prof_pic);
         *   Team.setName(tid, response.name.full);
         * }).then(()=>{
         */
          teamids.push(resp);
          i+=1;
          if(i == teamobjlist.length) resolve(teamids);
      }).catch(function(err){console.log(err)});
    })
  })
}
export function addTeamPlayersToMatch(teamid, matchid) {
  //console.log("addTeamPlayersToMatch");
  return new Promise(function(resolve, reject) {
      teamdb.child(teamid).child('players').on("value", function(snapshot) {
        var players = []
        players = players.concat(snapshot.val())
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
  console.log("Team1or2");
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
  console.log("onTeam");
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
   getTeam, addMatch, _AddMatch, addPlayer, _AddPlayer, addTeamPlayersToMatch,
   teamOneorTwo, onTeams, createFromList, findOne, addTournament, setProfPic};
