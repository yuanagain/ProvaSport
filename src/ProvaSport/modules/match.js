
/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from './player'
import * as Team from './team'
import * as Tournament from '../modules/tournament'
import * as Trophy from '../modules/trophy'



var matchdb = require("firebase");
var ref = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
matchdb = new Firebase("https://shining-torch-4767.firebaseio.com/match");
ref = new Firebase("https://shining-torch-4767.firebaseio.com/");

/*player object within Player class*/
function _GetMatch(matchid, callback) {
  /* var match = new Match(matchid); */
  //console.log("MATCHID: " + String(matchid))
    var promise = new Promise(function(resolve, reject) {
        matchdb.child(matchid).on("value", function(snapshot) {
          var match = snapshot.val();
          if(match === null){
            match = default_match;
          }
          if(!match.hasOwnProperty('teams')){
            match.teams = [];
          }
          resolve(match);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(err){
      console.log("Failed in _Getmatch "+err + " Matchid: "+matchid);
    });
}
function getMatch(matchid) {
  /* var match = new Match(matchid); */
  return new Promise(function(resolve, reject) {
      matchdb.child(matchid).on("value", function(snapshot) {
        var match = snapshot.val();
        if(!match.hasOwnProperty('teams')){
          match.teams = [];
        }
        resolve(match);
      });
   });
}


function _SetMatch(matchid, obj, callback) {
  var promise = new Promise(function(resolve, reject) {
      matchdb.child(matchid).set(obj, function(error) {
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
  }).catch(function(err) {
    console.log("SetMatch Failed"+err);
  });
}

function setMatch(matchid, obj) {
  return new Promise(function(resolve, reject) {
      matchdb.child(matchid).set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data saved successfully.");
          resolve(obj);
        }
      });
    });
}
function createMatch(obj) {
  //console.log("CALLED MATCH.CREATEMATCH!!!")
  return new Promise(function(resolve, reject) {
      var newRef = matchdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          var key = newRef.key();
          //is this what we really need to call?
         if (obj.teams) {
            obj.teams.forEach(function(teamid){
              Team.addMatch(teamid, key);
              //Get the team?
              //Team.addTeamPlayersToMatch(teamid, key);
            /* if(obj.tournamentid != -1 ){
              Player.addTournament(playerid, obj.tournamentid)
            }*/
            });
          }
          resolve(newRef.key());
        }
      });
    });
}
function unique(list) {
  return list.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
}

function _CreateMatch(obj, callback) {
  var promise = new Promise(function(resolve, reject) {
      var newRef = matchdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          resolve(newRef.key());
        }
      });
    })
    promise.then(function (value) {
      // add all matchid to players
      if (obj.teams){
        obj.teams.forEach(function(teamid){
          Team.addMatch(teamid, value);
          //Get the team?

           /*
           *  Team.getTeam(teamid).then(function(team){
           *     team.players.forEach(function(playerid){
           *       Player.addMatch(playerid, value)
           *    });
           *   });
            */


          /* if(obj.tournamentid != -1 ){
            Player.addTournament(playerid, obj.tournamentid)
          }*/
        });
      }

      callback(value);
    }).catch(function(err) {
      console.log("Something went wrong in _CreateMatch"+err)
    });
}

//search through fields of data to see if key to update in matches
function updateMatch(matchid, data) {
  matchdb.child(matchid).update({
    data
  })
}


function updateScores(matchid, data) {
  matchdb.child(matchid).update({
    "scores": data
  })
//  return getMatch(matchid)
}


/*Update the status of the match
  0- 4 for code numbers
  */
function updateStatus(matchid, team, code) {
  if (team == 0) {
    matchdb.child(matchid).child(staus).child(code).update({
      0: code
    })
  }
  else if (team == 1) {
    matchdb.child(matchid).child(staus).child(code).update({
      1: code
    })
  }
}

function changeStatus(matchid, code) {
  getMatch(matchid).then(function(value){

  })
  return new Promise(function(resolve, reject) {
      matchdb.child(matchid).set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data saved successfully.");
          resolve(obj);
        }
      });
    });
}
/* from a list go in and create all those objects and make them all */
function _CreateFromList(matchobjlist, callback) {
  var matchids = []
  var i = 0;

  matchobjlist.forEach(function(matchobj){
    createMatch(matchobj).then(resp=>{
      matchids.push(resp);
      i+=1;
      if(i == matchobjlist.length) callback(matchids);
    }).catch(function(err){console.log(err)});
  })
}

function createFromList(matchobjlist, callback) {
  return new Promise(function (resolve) {
    var matchids = []
    var i = 0;

    matchobjlist.forEach(function(matchobj){
      createMatch(matchobj).then(resp=>{
        matchids.push(resp);
        i+=1;
        if(i == matchobjlist.length) resolve(matchids);
      }).catch(function(err){console.log(err)});
    })
  })
}


//in future just update the specific thing that is being changed
//set from list
function _SetFromList(matchidlist, matchobjlist, callback) {
  var matchids = []
  var i = 0;
  matchobjlist.forEach(function(matchobj){
    setMatch(matchidlist[i], matchobj).then(resp=>{
      if(i == matchidlist.length)callback(matchobjlist)
    }).catch(function(err){console.log("IN SetFromList: 229:\t"+err)});
      i+=1;
  })
}

function setFromList(matchidlist, matchobjlist) {
  return new Promise(function (resolve) {
    var matchids = []
    var i = 0;
    matchobjlist.forEach(function(matchobj){
      setMatch(matchidlist[i], matchobj).then(resp=>{
        if(i == matchidlist.length)resolve(matchobjlist)
      }).catch(function(err){console.log("IN SetFromList: 229:\t"+err)});
        i+=1;
    })
  })
}

/*  IDEA:
   "status": {
      '0': {
        'playerid': 'attitude'
        },
      '1': 1
    },

    BUT we will begin with integer codes  and work up*/
//actual team id team id indexed status
var default_match =
  {
        "datetime": 0,
        "sport": "LOADING",
        "scores": [["...","..."]],
        "tournamentid": -1,
        "winner": -1,
        "data": {},
        "teams": [],
        "payoutdata": {
          "xp": -1,
          "cash": -1
        },
        "status": {
          '0': 0,
          '1': 0
        },
        "name": "Loading",
        "location": "LOADING"
  };
  var TBD =
    {
          "datetime": 0,
          "sport": "LOADING",
          "scores": [["...","..."]],
          "tournamentid": -1,
          "winner": -1,
          "data": {},
          "teams": ["TBD","TBD"],
          "payoutdata": {
            "xp": -1,
            "cash": -1
          },
          "status": {
            '0': 0,
            '1': 0
          },
          "name": "TBD",
          "location": "TBD"
    };

/*Fetch a bunch of match objects and return the list of objects
  We need the list of objects to be in order of matchidArr
  this can be accomplished by:
  1) either mapping list to matchobjs
  2) or by for each with a completely new list
  this is a first draft and needs to be tested */
function _FetchList(matchidArr, callback) {
  var result = [];
  if (matchidArr) {
    matchidArr.forEach(function(matchid){
      getMatch(matchid).then(resp=>{result.push(resp); if(result.length == matchidArr.length)callback(result)});
    })
  }
}
/*Same as FetchList but with a promise for callbacks   */
function fetchList(matchidArr) {
  return new Promise(function(resolve){
    var result = [];
    if (matchidArr) {
      matchidArr.forEach(function(matchid){
        getMatch(matchid).then(resp=>{result.push(resp); if(result.length == matchidArr.length)resolve(result)});
      })
    }
  })
}
// will return teamid either 0 or 1 if in match and -1 if not in match
function isInMatch(matchid, playerid, callback) {
  getMatch(matchid).then(function(resp){
    teamid1 = resp.teams[0];
    teamid2 = resp.teams[1];
    Team.onTeams(teamid1, teamid2, playerid).then(resp=>{if(resp){
      Team.teamOneorTwo(teamid1, playerid).then(response=>callback(response));
    } else {
      callback(-1);
    }})
  })
}

function _TeamInMatch(matchid, teams, callback) {
  getMatch(matchid).then(function(resp){
    //check if match teams are in player's teams
    if(teams.indexOf(resp.teams[0]) > -1){
      callback(0)
    }
    else if (teams.indexOf(resp.teams[1]) > -1) {
      callback(1)
    }
    else {
      callback(-1)
    }
  })
}


function teamInMatch(matchid, teams) {
  new Promise(function(resolve){
    getMatch(matchid).then(function(resp){
      //console.log("TEAMS:   "+teams)
      if (teams == undefined){
        resolve(-1)
      }
      //check if match teams are in player's teams
      else if(teams.indexOf(resp.teams[0]) > -1){
        resolve(0)
      }
      else if (teams.indexOf(resp.teams[1]) > -1) {
        resolve(1)
      }
      else {
        resolve(-1)
      }
    })
  })
}


function myStatus(matchid, playerobj) {
  console.log("myStatus matchid:  "+matchid + "playerteams: "+ playerobj.teams);
  return new Promise(function (resolve) {
    getMatch(matchid).then(function(oMatch) {
      if (playerobj.teams != undefined && playerobj.teams.constructor == Array){
        console.log("Running TeamInMatch")
        teamInMatch(matchid, playerobj.teams, function(index){
          if(index != -1) {
            resolve(oMatch.status[index])
          }
          else {
            resolve(1);
          }
        })
    }
    else {
      resolve(1);
    }
    })
  })
}

function getAllMatches() {
  var matches = []
  return new Promise(function(resolve, reject) {
      ref.child('match').on("value", function(snapshot) {
        var val = snapshot.val();
        var len = Object.keys(val).length;
        var i = 0;
        snapshot.forEach(function(match){
          i++;
          if(!match.hasOwnProperty('teams')){
            match.teams = [];
          }
          matches.push(match.val())
          if(i == len){
            resolve(matches)
          }
        })
      });
   });
}

function addTournament(matchid, tournid) {

}

//getAllMatches().then(resp=>console.log(resp))
//tieMatchTo(35, 1, 1)
/*CHANGED ***************HOW TO PARSE ARRAYS************** TODO*/
/*
 * ref.child("match").child(35).child("teams").on("value", function(snapshot){
 *   var obj = snapshot.val()
 *   var arr = Object.keys(obj).map(function(k) {
 *      return obj[k]
 *    });
 *    console.log(obj)
 *   console.log(arr)
 *   ref.child("match").child(35).child("teams").set(arr);
 * })
 */

//console.log(createMatch(default_match));
/*
 * setMatch(35, default_match, function(){
 *   console.log(" ");
 * })
 */
 /*
  * createMatch(default_match).then(function (value) {
  *   console.log(value);
  * })
  */
  //_CreateMatch(default_match, function(val) {console.log("new Match: " + val)})
  //updateScores(1, [[98,89],[0,1]]) TESTED SUCCESSFULLY
  var matchlist = [default_match, default_match, default_match, default_match]
//createFromList(matchlist, function(array){console.log(array)})
  var matchidList = ["-KG9drQiXJf-rPjzm6pO", "-KG9eNImruNKE5N6LNcm", "-KG9ircVFfcyt6QX_ySH", "-KG9kHl5HCdl0dePPkZc"]
//  fetchList(matchidList).then(resp=>console.log(resp)) SUCCESS
//_FetchList(matchidList, function(resp){console.log(resp)}) SUCCESS
//setFromList(matchidList, matchlist, function(resp){console.log("SET Correctly")}) SUCCESS
//isInMatch(1, 0, function(resp){console.log("INMATCH: "+resp)})
//myStatus(0, 0).then(resp=>console.log(resp))
//var matchidTest = 1;
//_GetMatch(matchidTest, function(resp){console.log(resp)})
/*
 * import Store from 'react-native-store';
 * const DB = {
 *   'user': Store.model("user"),
 *   'player': Store.model("player")
 * }
 */
//DB.player.find().then(resp=>console.log(resp))
 //DB.player.add(Player.default_player, 0)//.then(()=>DB.player.find().then(resp=>console.log(resp)))



module.exports = {_GetMatch, default_match, TBD, setMatch, createMatch, _SetMatch,
                  _CreateMatch, updateScores, updateStatus, _CreateFromList,
                  createFromList, fetchList, _FetchList, setFromList, _SetFromList,
                  isInMatch, myStatus, getAllMatches};
