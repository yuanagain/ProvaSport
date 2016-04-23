
/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
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
    var promise = new Promise(function(resolve, reject) {
        matchdb.child(matchid).on("value", function(snapshot) {
          var match = snapshot.val();
          resolve(match);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
function getMatch(matchid) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
        matchdb.child(matchid).on("value", function(snapshot) {
          var match = snapshot.val();
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
  }).catch(function() {
    console.log("Failed");
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
  return new Promise(function(resolve, reject) {
      var newRef = matchdb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());

          obj.teams.forEach(function(teamid){
            Team.addMatch(teamid, newRef.key());
            //Get the team?
            Team.getTeam(teamid).then(function(value){
              value.players.forEach(function(playerid){
                Player.addMatch(playerid, newRef.key())
              });
            });

            /* if(obj.tournamentid != -1 ){
              Player.addTournament(playerid, obj.tournamentid)
            }*/
          });
          resolve(newRef.key());
        }
      });
    });
}
function makeMatch(matchobj, team1, team2) {
  createTeam(team1, team1)
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
      obj.teams.forEach(function(teamid){
        Team.addMatch(teamid, value);
        //Get the team?
        Team.getTeam(teamid).then(function(team){
          team.players.forEach(function(playerid){
            Player.addMatch(playerid, value)
          });
        });

        /* if(obj.tournamentid != -1 ){
          Player.addTournament(playerid, obj.tournamentid)
        }*/
      });

      callback(value)
    }).catch(function(err) {
      console.log("Something went wrong in _CreateMatch"+err)
    });
}
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

//THIS may not work...
function selectScores(matchid, index, num = 1){
  getMatch(matchid).then(function (value) {
    value.scores.splice(index, num);
  })
}
/*Update the status of the match
  0- 4 for code numbers
  */
function updateStatus(matchid, code) {
  matchdb.child(matchid).update({
    "status": code
  })
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
function createForList() {

}
function populate(data, index) {
  this.array[index] = data
  // if this.array no longer contains uninitialized entries
  if (this.array.indexOf(-1) == -1) {
    this.finalize() //submits the torunament and then go into all players and teams and add their
  }
  //use index to modify a specific Location
  //query last returning query
  //all other elements are not -1
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
        "teams": [0,0],
        "payoutdata": {
          "xp": -1,
          "cash": -1
        },
        "status": {
          '0': 0,
          '1': 1
        },
        "name": "matchesHaveNames?",
        "location": "LOADING"
  };


/* Simultanious update of match player test module to
 * determine futhur use
 * Then we create tournaments tonight
 */
function tieMatchTo(matchid, playerid, teamid) {
   Match.addTeam(teamid);
   Team.addMatch(matchid);
   Player.addMatch(matchid);

}

//tieMatchTo(35, 1, 1)
/*CHANGED ***************HOW TO PARSE ARRAYS************** TODO*/
ref.child("match").child(35).child("teams").on("value", function(snapshot){
  var obj = snapshot.val()
  var arr = Object.keys(obj).map(function(k) {
     return obj[k]
   });
   console.log(obj)
  console.log(arr)
  ref.child("match").child(35).child("teams").set(arr);
})

function makeMatchA() {
  Team._CreateTeam(teamobj2).then(makematch(team1, team2));
}
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
module.exports = {_GetMatch, default_match, setMatch, createMatch, _SetMatch,
                  _CreateMatch, updateScores, updateStatus};
