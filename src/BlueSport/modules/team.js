var teamdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
teamdb = new Firebase("https://incandescent-torch-5505.firebaseio.com/team");
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

var default_team = {
    "name": "LOADING",
    "players": []
};

module.exports = {_GetTeam, default_team};
