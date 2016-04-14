var matchdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
matchdb = new Firebase("https://shining-torch-4767.firebaseio.com/match");
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
  }).catch(function(){
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
          resolve(newRef.key());
        }
      });
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
      callback(value)
    }).catch(function() {
      console.log("Something went wrong in _CreateMatch")
    });
}


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
        "location": "LOADING"
  };
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
module.exports = {_GetMatch, default_match, setMatch, createMatch, _SetMatch, _CreateMatch};
