var teamdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
teamdb = new Firebase("https://incandescent-torch-5505.firebaseio.com/team");

class Team {
  var Team = {
      teamid: -1,
      name: "string",
      players: []
  };
  /*constructor for the Team Object
    input: query teamid
    creates and loads Team based off of teamid*/
  constructor(teamid) {
    let this.Team.teamid = teamid; //might need to define getInitState
    load(teamid);
  }
  /* Loads the Team object double check the scope of this  */
  function load(teamid) {
    teamdb.orderByChild("teamid").equalTo(teamid).once("value", function(snapshot) {
      this.Player = snapshot.val();
    }, function (errorObject) {
      console.log("The team read failed: " + errorObject.code);
    });
  }
  function addPlayer(playerid) {
    Team.players.append(playerid);
    teamdb.child(Team.teamid).child(players).push(playerid);
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

module.exports = TeamData;
