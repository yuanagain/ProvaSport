/* TODO: make sure not changing indexes fo matches */


var matchdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
matchdb = new Firebase("https://incandescent-torch-5505.firebaseio.com/match");
/*player object within Player class*/
class Match {
  /*
  TODO get rid of the "" for keys
  design decisions about uploading child ony or object to the cloud
   * Match object that will
   * serve as the JSON object Firbase will download to
   */
/*Creates the match object and loads it from the Firebase  */
  constructor(matchid) {
    this.matchid = matchid; /* make this completely immutable */
    this.match = {
          "datetime": 0,
          "sport": "",
          "scores": [],
          "tournamentid": -1,
          "winner": -1,
          "data": {},
          "teams": [],
          "payoutdata": {
            "xp": -1,
            "cash": -1
          },
          "location": ""
    };
    this.load();
  }
  /* Loads the correct match object from Firebase and caches to local variable*/
  load() {
    matchdb.once("value", function(snapshot) {
      this.match = snapshot.val();
      console.log(this.match)
    }, function (errorObject) {
      console.log("The match read failed: " + errorObject.code);
    });
  }
  /* add team to the Match */
  addTeam(argTeamid) {
     this.match.teams.append(argTeamid);
    var ref = matchdb.child(this.matchid).child(teams);
    ref.push(argTeamid);
  }

  /* set time for the Match */
  setTime(argTime) {
    /* %d argTime for EPCOH */
    var ref = matchdb.child(this.matchid).child(time);
    ref.set(argTime);
  }
  /* add team to the Match */
  reportScore(scoreTuple) {
    var ref = matchdb.child(this.matchid).child(scores);
    ref.push(scoreTuple);
  }
  /* takes in a dictionary of payout data and updates that value loacally and in DB */
  setPayout(dictPay) {
   this.match.payoutdata = dictPay;
    var ref = matchdb.child(this.matchid).child(payoutdata);
    ref.set(dictPay);
  }
  /* takes in a dictionary of match data and updates that value loacally and in DB */
  setData(dataObj) {
   this.match.data = dataObj;
    var ref = matchdb.child(this.matchid).child(data);
    ref.set(dataObj);
  }
  setLocation(argloc) {
   this.match.location = argloc;
    matchdb.child(this.matchid).child(location).set(argloc);
  }
  setSport(strSport) {
   this.match.sport = strSport;
    matchdb.child(this.matchid).child(sport).set(strSport);
  }
  reportWinner(playerid){
   this.match.winner = playerid;
    matchdb.child(this.matchid).child(winner).set(playerid); // allow multiple winners??
  }
  /*  */
  /*
   * Usage: this.type()
   * returns the string type standardized as:
   * "round-robin" or "bracket"
   */
   type() {
    return this.match.type;
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
 getTime() {
    return this.match.datetime;
  }

  /*
   * Usage: this.getSport()
   * description: return the standardized *****TODO*****
   * string of the sport type
   */
  getSport() {
    console.log(this.match)
    console.log('++++++++++++')
    return this.match['sport'];
  }

  /*
   * Usage: this.getScores()
   * return type: 2D array
   * Description: returns the scores of the Match
   */
   getScores() {
    return this.match.scores;
  }
  /*
   *
   * Usage: this.getTournament()
   * returns the tournamentid of the tournament the match is bound to
   */
   getTournament() {
    return this.match.tournamentid;
  }
  /*
   * usage: this.getWinner()
   * returns playerid of winner
   */
   getWinner() {
    return this.match.winner;
  }
  /*
   * Usage: this.getData()
   * returns the data dictionary with each match data
   */
   getData() {
    return this.match.data;
  }
  /*
   * Usage: this.getTeams()
   * desciption: returns the array of teamids indicating teams particpating in match
   */
   getTeams() {
    return this.match.teams;
  }
  /*
   * Usage: this.getPayout()
   * Description: returns payout data for the match as a dictionary of form:
   * payoutdata : {
   *   "xp": value
   *   "cash": value
   * }
   */
   getPayout() {
    //return Match.payout;
    return this.match.payoutdata;
  }
  /*possibly add stuff like isOnTeam etc.*/
  /*
   * Usage: this.getLocation()
   * returns GPS data of the location of the match to integrate into map
   */
   getLocation() {
    return this.match.data;
  }
  /*  */
  updateData(jsonObj) {
    /* assumes valid Json for entire object and match created*/
    matchdb.child(this.matchid).update(jsonObj);
  }
  setAttribute() {
    return
  }
};

module.exports = Match;
