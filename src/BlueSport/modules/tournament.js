var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Tournament {
  var Tournament = {
  "tournamentid": -1,
  "type": "",
  "teams": int([]),
  "location": (,), /*tuple of  Latitude and Longitude*/
  "dates": [new Date()],
  "sport": "(string)",
  "matches" int([]),

  };
  constructor(tournamentid) {
    let this.state.tournamentid = tournamentid; //might need to define getInitState
  }
  function load() {

  }
  function type() {
    return
  }

  function getTeams() {}
  function getLocation() {

  }
  function getTimes() {

  }
  function getSport() {

  }
  function getMatches(num) {

  }

/*possibly add stuff like isOnTeam etc.*/

}
