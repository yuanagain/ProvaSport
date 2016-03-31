var matchdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
matchdb = new Firebase("https://incandescent-torch-5505.firebaseio.com/match");
/*player object within Player class*/
var Match;
class Match {
  /*
   * Match object that will
   * serve as the JSON object Firbase will download to
   */
  Match =
    {
      "matchid": -1,
      "datetime": 0,
      "sport": "string",
      "scores": [],
      "tournamentid": -1,
      "winner": -1,
      "data": {},
      "teams": [],
      "payoutdata": {
        "xp": -1,
        "cash": -1
      },
      "location": ()
  };
/*Creates the match object and loads it from the Firebase  */
  constructor(matchid) {
    Match.matchid = matchid; /* make this completely immutable */
    load(matchid);
    /* alert(Match.matchid); */
  }
  /* Loads the correct match object from Firebase and caches to local variable*/
  function load(matchid) {
    matchdb.orderByChild("matchid").equalTo(matchid).once("value", function(snapshot) {
      this.Match = snapshot.val();
    }, function (errorObject) {
      console.log("The match read failed: " + errorObject.code);
    });
  }
  /*
   * Usage: this.type()
   * returns the string type standardized as:
   * "round-robin" or "bracket"
   */
  function type() {
    return Match.type;
  }
/* Usage: this.getTime()
 * returns the time of the Match as an EPOCH (integer milliseconds since
 * Jan 1st 1970) parse with JavaScript's Date object
 *
 * Accessing the Date:
 * 1. import Date Library
 * 2. d = new Date(Epoch)
 * 3. string day = d.toString("%d"); Other documnetation of the date object found:
 http://www.w3schools.com/jsref/jsref_obj_date.asp
 */
  function getTime() {
    return Match.datetime;
  }

  /*
   * Usage: this.getSport()
   * description: return the standardized *****TODO*****
   * string of the sport type
   */
  function getSport() {
    return Match.sport;
  }

  /*
   * Usage: this.getScores()
   * return type: array of tuples
   * Description: returns the scores of the Match
   */
  function getScores() {
    return Match.scores;
  }
  /*
   * Usage: this.getTournament()
   * returns the tournamentid of the tournament the match is bound to
   */
  function getTournament() {
    return Match.tournamentid;
  }


  /*
   * usage: this.getWinner()
   * returns playerid of winner
   */
  function getWinner() {
    return Match.winner;
  }

  /*
   * Usage: this.getData()
   * returns the data dictionary with each match data
   */
  function getData() {
    return Match.data;
  }

  /*
   * Usage: this.getTeams()
   * desciption: returns the array of teamids indicating teams particpating in match
   */
  function getTeams() {
    return Match.teams;
  }

  /*
   * Usage: this.getPayout()
   * Description: returns payout data for the match as a dictionary of form:
   * payoutdata : {
   *   "xp": value
   *   "cash": value
   * }
   */
  function getPayout() {
    //return Match.payout;
    return Match.payoutdata;
  }
  /*possibly add stuff like isOnTeam etc.*/
  /*
   * Usage: this.getLocation()
   * returns GPS data of the location of the match to integrate into map
   */
  function getLocation() {
    return Match.data;
  }
}
export match
