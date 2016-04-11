
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
        playerdataRef.child(playerid).on("value", function(snapshot) {
          var player = snapshot.val();
          resolve(player);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
  var default_player = {
    "name" : "Loading",
    "userid" : -1,
    "prof_pic": "Loading",
    "elo": 0.0,
    "earnings": [ {"sport" :
    {
      "cash": 0,
      "xp": 0,
      "trophies": [-1]
    }} ],
    "home": "LOADING",
    "sports": "LOADING",
    "imageURL": "Loading",
    "friends": [0],
    "teams": [],
    "matches": [],
    "tournaments": []
  };

module.exports = {_GetPlayer, default_player};
