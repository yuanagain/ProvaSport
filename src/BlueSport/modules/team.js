var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Team {
  var Team = {
    "teamid": -1,
    "name": "(string)",
    "players": []
  };
  constructor(teamid) {
    let this.state.teamid = teamid; //might need to define getInitState
  }
  function load() {

  }
  function getName() {
    return
  }
  function getPlayers() {}
}
