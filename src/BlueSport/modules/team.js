var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");

class Team {
  var Team = {
    "teamid": -1,
    "name": "(string)",
    "players": []
  };
  /*constructor for the Team Object
    input: query teamid
    creates and loads Team based off of teamid*/
  constructor(teamid) {
    let this.state.teamid = teamid; //might need to define getInitState
    load();
  }
/* Loads the Team object double check the scope of this  */
  function load() {
    this.Team = Firebase.get("/"+this.Team.teamid);
  }
  /* Get the name of the Team */
  function getName() {
    return this.Team.name;
  }
  /* returns all players that are on the team
   */
  function getPlayers() {
    return this.Team.Players
  }
  /* Add remove player? who is team leader or team captain? what about team
  structures do we have to incorporate into the data obj? */
}
