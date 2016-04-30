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
          if (player==null){
            console.log("\n\n*******************NULL********************\n"+playerid)
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
function GetPlayer(playerid) {
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

export function removeFriend(playerid, friend) {
  //console.log(playerid)
  var specificRef = playerdataRef.child(playerid).child('friends')
  var list = []
  //console.log("\n\nFRIENDID: "+friend)
  return new Promise(function(resolve){
    specificRef.on('value', function(snap) {
      //console.log(snap.val())
      resolve(snap.val());
    });
  }).then(function(resp){
    resp = deleteEle(friend, resp);
    //console.log(resp);
    if (resp.length != 0){
      specificRef.set(resp);
    }
    else {
      resp = [];
      specificRef.set(resp);
    }
  })
}

function deleteEle(value, array) {
  //console.log("DELETING")
  //console.log(array)
  //console.log(value)
  var index = array.indexOf(value);
  if(index > -1){
    array.splice(index, 1);
  }
  return array;
}

export function addMatch(playerid, matchid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    playerdataRef.child(playerid).child('matches').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}


export function addTeam(playerid, teamid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    playerdataRef.child(playerid).child('teams').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}


export function addTournament(playerid, torunamentid) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        resolve(tournaments);
      });
   });
  promise.then(function(list){
    list.push(tournamentid);
    playerdataRef.child(playerid).child('tournaments').set(list)
  }).catch(function(){
    console.log("Failed");
  });
}

function _AddMatch(playerid, matchid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('matches').on("value", function(snapshot) {
        var matches = []
        matches = snapshot.val();
        resolve(matches);
      });
   });
  promise.then(function(list){
    list.push(matchid);
    playerdataRef.child(playerid).child('matches').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTeam(playerid, teamid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('teams').on("value", function(snapshot) {
        var teams = []
        teams = snapshot.val();
        resolve(teams);
      });
   });
  promise.then(function(list){
    list.push(teamid);
    playerdataRef.child(playerid).child('teams').set(list)
    callback(list)
  }).catch(function(){
    console.log("Failed");
  });
}


function _AddTournament(playerid, tournamentid, callback) {
  var promise = new Promise(function(resolve, reject) {
      playerdataRef.child(playerid).child('tournaments').on("value", function(snapshot) {
        var tournaments = []
        tournaments = snapshot.val();
        resolve(tournaments);
      });
   });
  promise.then(function(list){
    list.push(tournamentid);
    playerdataRef.child(playerid).child('tournaments').set(list)
    callback(list)
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
/*
 * function sendImageToS3(uri){
 *   // need to change so we POST with Form
 *   var AWSSignature = require('react-native-aws-signature');
 * var awsSignature = new AWSSignature();
 * var source1 = {uri: response.uri, isStatic: true}; // this is uris which got from image picker
 *         console.log("source:"+JSON.stringify(source1));
 *         var credentials = {
 *           SecretKey: ‘security-key’,
 *           AccessKeyId: ‘AccesskeyId’,
 *           Bucket:’Bucket_name’
 *         };
 *         var options = {
 *           path: '/?Param2=value2&Param1=value1',
 *             method: 'POST',
 *             service: 'service',
 *             headers: {
 *                 'X-Amz-Date': '20150209T123600Z',
 *                 'host': 'xxxxx.aws.amazon.com'
 *             },
 *           region: ‘us-east-1,
 *           body: response.uri,
 *           credentials
 *         };
 *         awsSignature.setParams(options);
 *         var signature = awsSignature.getSignature();
 *         var authorization = awsSignature.getAuthorizationHeader();
 * }
 function uploadProgress(evt) {
     if (evt.lengthComputable) {
       var percentComplete = Math.round(evt.loaded * 100 / evt.total);
       document.getElementById('progressNumber').innerHTML = percentComplete.toString() + '%';
     }
     else {
       document.getElementById('progressNumber').innerHTML = 'unable to compute';
     }
   }

   function uploadComplete(evt) {
     /* This event is raised when the server send back a response *
     alert("Done - " + evt.target.responseText );
   }

   function uploadFailed(evt) {
     alert("There was an error attempting to upload the file." + evt);
   }

   function uploadCanceled(evt) {
     alert("The upload has been canceled by the user or the browser dropped the connection.");
   }


 */
//FOR EMERGENCIES ONLY
//playerdataRef.child(0).child('friends').remove();
function uploadFile() {

    var file = document.getElementById('file').files[0];
    var fd = new FormData();

    var key = "events/" + (new Date).getTime() + '-' + file.name;

    fd.append('key', key);
    fd.append('acl', 'public-read');
    fd.append('Content-Type', file.type);
    fd.append('AWSAccessKeyId', 'YOUR ACCESS KEY');
    fd.append('policy', 'YOUR POLICY')
    fd.append('signature','YOUR SIGNATURE');

    fd.append("file",file);

    var xhr = getXMLHTTPObject();

    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);

    xhr.open('POST', 'https://<yourbucket>.s3.amazonaws.com/', true); //MUST BE LAST LINE BEFORE YOU SEND

    xhr.send(fd);
  }




module.exports = {_GetPlayer, GetPlayer, createPlayer, default_player, addMatch,
                  addTeam, addFriend, addTournament, _AddTeam, _AddMatch, removeFriend, _AddTournament,
                   searchPlayers, getFriends, getFriendsMatches};
