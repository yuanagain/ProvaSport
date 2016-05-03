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
        if (playerid == -1)
        {
          //future return yourself
          resolve(default_player);
        }
        else {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          if (player == null){
            //console.log("\n\n*******************NULL********************\n"+playerid)
            resolve(default_player)
          }
          if(!player.hasOwnProperty('teams')){
            player.teams = [];
          }
          if(!player.hasOwnProperty('matches')){
            player.matches = [];
          }
          if(!player.hasOwnProperty('tournaments')){
            player.tournaments = [];
          }
          if(!player.hasOwnProperty('friends')){
            player.friends = [];
          }
          resolve(player);
        });
      }
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(err ){
      console.log("Failed in _getPlayer "+ err);
    });
}

/*possilby add stuff like isOnTeam etc.*/
export function GetPlayer(playerid) {
  /* var match = new Match(matchid); */
  if (playerid == -1)
  {
    //future return yourself
    resolve(default_player);
  }
  else {
    return new Promise(function(resolve, reject) {
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          if(!player.hasOwnProperty('teams')){
            player.teams = [];
          }
          if(!player.hasOwnProperty('matches')){
            player.matches = [];
          }
          if(!player.hasOwnProperty('tournaments')){
            player.tournaments = [];
          }
          if(!player.hasOwnProperty('friends')){
            player.friends = [];
          }
          resolve(player);
        });
     });
   }
}
function setPlayer(id, obj) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
      playerdataRef.child(id).set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data saved successfully ");
          resolve(obj);
        }
      });
    });
}
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
function createPlayer(obj) {
  /* var match = new Match(matchid); */
    return new Promise(function(resolve, reject) {
      var newRef = playerdataRef.push();
      newRef.set(obj, function(error) {
        if (error) {
          //console.log("Data could not be saved." + error);
          reject();
        } else {
          //console.log("Data CREATED successfully "+ newRef.key());
          var key = newRef.key();
          //console.log(Team.addMatch)
          resolve(newRef.key());
        }
      });
    });
}
//this should work
//returns an array of playerids
function searchPlayers(query, callback) {
  return new Promise(function(resolve){
    var possibleFriends = []
    playerdataRef.orderByChild("name/full").on("value", function(snapshot) {
      var i = 0;
      var target = Object.keys(snapshot.val()).length;
      //console.log(target)
      snapshot.forEach(function(childSnap){
        var string = childSnap.val().name.full.toLowerCase();
        var q = query.toLowerCase();
        //console.log(string.search(q))
        var value = childSnap.val();
        i += 1;
        if (string.search(q) > -1) {
          possibleFriends.push(childSnap.key())
          if (possibleFriends.length == 100){
            callback(possibleFriends)
          }
        }
        if (i == target-1){
          //console.log("DONE")
          callback(possibleFriends)
        }
      })
    })
  })
}

export function addFriend(playerid, friend) {
  var list = []
  //console.log("adding friend:")
  //console.log("playerid"+playerid);
  if (playerid === undefined || playerid === -1){
    console.log("ERROR")
    return;
  }
  //console.log(friend);
  return new Promise(function(resolve){
  playerdataRef.child(playerid).child('friends').on('value', function(snap) {
    var val = snap.val()
    //console.log(val)
    if(val)
    {
      list = list.concat(val);
    }
    list.push(friend);
    console.log("PLAYER ADDED FRIENDS:"+playerid)
    console.log(list);
    resolve(list)
  });
}).then(resp=>{playerdataRef.child(playerid).child('friends').set(list);})
}

export function removeFriend(playerid, friend, callback) {
  //console.log(playerid)
  var specificRef = playerdataRef.child(playerid).child('friends')
  var list = []
  //console.log("\n\nFRIENDID: "+friend)
  return new Promise(function(resolve){
    specificRef.on('value', function(snap) {
      //console.log(snap.val())
      var list = snap.val();
      // corner case if they have no friends to begin with
      if (list === null|| list === undefined){
        resolve([])
      }
      else {
        resolve(list);
      }
    });
  }).then(function(resp){
      //console.log(resp);
      var index = resp.indexOf(friend);
      if (index > -1) {
        resp.splice(index, 1);
      }
      //console.log(resp);
      specificRef.set(resp);
      return Promise.resolve(resp)
  })
}
//removeFriend(1, 0).then(resp=>console.log("TEST"+resp))

export function addMatch(playerid, matchid) {
  console.log(playerid);
  console.log(matchid);
  return new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        if(matches == null){
          resolve([])
        }
        resolve(matches);
      });
   }).then(function(list){
    list.push(matchid);
    list = unique(list);
    playerdataRef.child(playerid).child('matches').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}
//addMatch('-KGYDKMSon-By4z-oLx8', 1).then(resp=>console.log(resp))

export function addTeam(playerid, teamid) {
  return new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        if (teams === null){
          resolve([]);
        }
        resolve(teams);
      });
   }).then(function(list){
    list.push(teamid);
    list = unique(list);
    playerdataRef.child(playerid).child('teams').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}
//addTeam('-KGYDKMSon-By4z-oLx8', 0).then(resp=>console.log(resp))

export function addTournament(playerid, tournamentid) {
  return new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        if (tournaments === null){
          resolve([])
        }
        resolve(tournaments);
      });
   }).then(function(list) {
    list.push(tournamentid);
    list = unique(list);
    playerdataRef.child(playerid).child('tournaments').set(list)
  }).catch(function(){
    console.log("Failed to add tournament "+tournamentid);
  });
}

function _AddMatch(playerid, matchid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        if (matches === null){
          resolve([])
        }
        resolve(matches);
      });
   }).then(function(list){
    list.push(matchid);
    playerdataRef.child(playerid).child('matches').set(list)
    callback(unique(list))
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTeam(playerid, teamid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
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
    playerdataRef.child(playerid).child('teams').set(list)
    callback(unique(list))
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTournament(playerid, tournamentid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        if (tournaments === null){
          resolve([])
        }
        resolve(tournaments);
      });
   });
  promise.then(function(list){
    list.push(tournamentid);
    playerdataRef.child(playerid).child('tournaments').set(list)
    callback(unique(list))
  }).catch(function(err){
    console.log("Failed to add Tournament to Player   " + err);
  });
}


function getFriends(playerid){
  return new Promise(function(resolve){
    GetPlayer(playerid).then(resp=>{
      var player = resp;
      if (!player.hasOwnProperty('friends')){
        console.log("NO friends :(")
        resolve([])
      }
      var friendObjList = [];
      var friends = player.friends;
      console.log(player.friends)
      friends.forEach(function(friend){
        GetPlayer(friend).then(resp=>{
          friendObjList.push(resp);
          if (friends.length == friendObjList.length){
            resolve(friendObjList);
          }
        })
      })
    })
  })
}
function setProfPic(playerid, url) {
  return new Promise(function(resolve) {
    playerdataRef.child(playerid).update({prof_pic: url})
  })
}

function getFriendsMatches(playerid) {
  return new Promise(function(resolve) {
    var matches = [];
    var i = 0;
    getFriends(playerid).then(resp=>{
      resp.forEach(function(friendobj){
        i++;
        matches = matches.concat(friendobj.matches);
        if (i == resp.length){
          resolve(unique(matches))
        }
      })
    })
  })
}
/*
@params: sport: string sport
data in the form of the json object containing data to be totalled  */
function totalEarnings(pid, sport, data) {
  if (sport.constructor === Array.object()){
    sport = sport[0]
  }
  GetPlayer(pid).then(player=>{
    
  })
}

function unique(list) {
  return list.filter(function(elem, pos, arr) {
    return arr.indexOf(elem) == pos;
  });
}
export var default_player = {
    "name" : {
      "first": "Loading",
      "last": "Loading",
      "full": "Loading",
    },
    "userid" : -1,
    "prof_pic": "Loading",
    "elo": 0.0,
    "nationality": "",
    "earnings": [ {"sport" :
    {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
    }} ],
    "home": " ",
    "sports": "LOADING",
    "imageURL": "http://www.jennstrends.com/wp-content/uploads/2013/10/bad-profile-pic-2.jpeg",
    "friends": [],
    "teams": [],
    "matches": [],
    "tournaments": []
  };
  //_AddTeam(0,1,function(resp){console.log(resp)}) //TESTED SUCCESSFULLY(and _AddTournament, an)
  var query = "DJ"
  var id = '-KGKjt9HJnSKgdIDNr9W';
//searchPlayers(query,function(resp){console.log("RESPONSE:"+resp)})
//GetPlayer(id).then(resp=>console.log(resp))
//getFriendsMatches(0).then(resp=>console.log("RESPONSE: "+resp));
//FOR EMERGENCIES ONLY
//playerdataRef.child(0).child('friends').remove();

module.exports = {_GetPlayer, GetPlayer, createPlayer, default_player, addMatch,
                  addTeam, addFriend, addTournament, _AddTeam, _AddMatch, removeFriend, _AddTournament,
                   searchPlayers, getFriends, getFriendsMatches, setPlayer, setProfPic};
