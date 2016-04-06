var teamdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
teamdb = new Firebase("https://incandescent-torch-5505.firebaseio.com/team");

class Team {
  /*constructor for the Team Object
    input: query teamid
    creates and loads Team based off of teamid*/
  constructor(teamid) {
    this.hasLoaded =false;
    this.teamid = teamid; //might need to define getInitState
    this.Team = {
        "name": "string",
        "players": []
    };
    this.promise= new Promise(function(resolve, reject) {
      teamdb.child(teamid).on("value", function(snapshot) {
        this.Team = snapshot.val();
        console.log("\n\nDOWLOADED Team:  "+this.Team);
        this.hasLoaded = true;
        resolve(this.Team);
      });
    });
    /* Testing script */
    /* this.addPlayer(0); */
  }
  /* Loads the Team object double check the scope of this  */
  /*
   * load(teamid) {
   *   teamdb.orderByChild("teamid").equalTo(teamid).once("value", function(snapshot) {
   *     this.Player = snapshot.val();
   *   }, function (errorObject) {
   *     console.log("The team read failed: " + errorObject.code);
   *   });
   * }
   */
  addPlayer(playerid) {
    this.Team.players.append(playerid);
    teamdb.child(Data.teamid).child(players).push(playerid);
  }
  /* Get the name of the Team */
  getName() {
    if(!this.hasLoaded){
    this.promise.then(function(value){
      console.log(value.name);
      return value.name;
    });}
    else {
      return this.Team.name;
    }
  }
  /* returns all players that are on the team
   */
  getPlayers() {
    if(!this.hasLoaded){
    this.promise.then(function(value){
      console.log(value.players);
      return value.players;
    });}
    else {
      return this.Team.players;
    }
  }
  /* Add remove player? who is team leader or team captain? what about team
  structures do we have to incorporate into the data obj? */
}

module.exports = TeamData;
