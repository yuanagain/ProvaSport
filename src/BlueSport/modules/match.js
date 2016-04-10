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
        "location": "LOADING"
  };


module.exports = {_GetMatch, default_match};
