var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Match {
  var Match = {
    "matchid": -1,
    "datetime": [new Date()],
    "sport":" string",
    "scores": [()],
    "tournamentid": -1,
    "winner": -1,
    "data": {},
    "teams": int([]),
    "payoutdata": {
      "xp": -1,
      "cash": -1
    },
    "location": (),
  };
  constructor(tournamentid) {
    let this.state.tournamentid = tournamentid; //might need to define getInitState
  }
  function load() {

  }
  function type() {
    return
  }

  function getTime() {}
  function getSport() {

  }
  function getScores() {
    return ()
  }
  function getTournament() {
    return ()
  }
  function getWinner() {
    return userid
  }
  function getData() {

  }
  function getTeams() {

  }
  function getPayout() {
    return {}
  }
  /*possibly add stuff like isOnTeam etc.*/
  function getLocation() {

  }
}
