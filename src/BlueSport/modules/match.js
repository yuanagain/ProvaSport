<<<<<<< Updated upstream
=======
/* TODO: make sure not changing indexes fo matches */

>>>>>>> Stashed changes
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
var Match =
    {
      datetime: 0,
      sport: "",
      scores: [],
      tournamentid: -1,
      winner: -1,
      data: {},
      teams: [],
      payoutdata: {
        xp: -1,
        cash: -1
      },
      location: ()
  };
  var Data = {
    matchid: -1,
    data: Match // does this change if Match changes?
  };
/*Creates the match object and loads it from the Firebase  */
  constructor(matchid) {
<<<<<<< Updated upstream
    Data.matchid = matchid; /* make this completely immutable */
    load(matchid);
    /* alert(Data.matchid); */
  }
  /* Loads the correct match object from Firebase and caches to local variable*/
  function load(matchid) {
    matchdb.orderByChild("matchid").equalTo(matchid).once("value", function(snapshot) {
      this.Match = snapshot.val();
    }, function (errorObject) {
      console.log("The match read failed: " + errorObject.code);
    });
  }
  /* add team to the Match */
  function addTeam(argTeamid) {
    (Match.teams).append(argTeamid);
    var ref = matchdb.child(Data.matchid).child(teams);
=======
    this.hasLoaded = false;
    this.matchid = matchid; /* make this completely immutable */
    this.Match = {
          "datetime": 19900,
          "sport": "baskt",
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
    /* Loads the correct match object from Firebase and caches to local variable*/
      console.log("**************Asyncronous Calls ************");
      this.promise = new Promise(function(resolve, reject) {
      matchdb.child(matchid).on("value", function(snapshot) {
        this.Match = snapshot.val();
        console.log(this.Match);
        console.log("\n^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^\n\n");
        this.hasLoaded = true;
        resolve(this.Match);
      });
     });

    this.getSport = function() {
        if (this.hasLoaded){
          return this.Match.sport;
        }
        this.promise.then(function(value){
          console.log('+++++++++++++++++++++++++++++++');
          console.log(value.sport);
          console.log(this.hasLoaded);
          return value.sport;
        });
    };
    /*
     * this.getTime = function() {
     *   this.promise.then(function(value){
     *     console.log('GETTTTTTTIIIMMMMMMMMMEEEEEEEEE');
     *     console.log(value.datetime);
     *     return value.datetime;
     *   });
     * };
     */
    console.log("\n\n GET TIME:    " + this.getTime());
    console.log("\n\n GET TIME:    " + this.getSport());
  }
 /*
  *  rload() {
  *
  * }
  */

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
      this.promise.then(function(value){
        console.log('\n\n DateTIME: ');
        console.log(value.datetime);
        return value.datetime;
      });
    }
  /*
   * Usage: this.getSport()
   * description: return the standardized *****TODO*****
   * string of the sport type
   */

  /* add team to the Match */
  addTeam(argTeamid) {
     this.Match.teams.append(argTeamid);
    var ref = matchdb.child(this.matchid).child("teams");
>>>>>>> Stashed changes
    ref.push(argTeamid);
  }

  /* set time for the Match */
  function setTime(argTime) {
    /* %d argTime for EPCOH */
<<<<<<< Updated upstream
    var ref = matchdb.child(Data.matchid).child(time);
    ref.set(argTime);
  }
  /* add team to the Match */
  function reportScore(scoreTuple) {
    var ref = matchdb.child(Data.matchid).child(scores);
    ref.push(scoreTuple);
  }
  /* takes in a dictionary of payout data and updates that value loacally and in DB */
  function setPayout(dictPay) {
    Match.payoutdata = dictPay;
    var ref = matchdb.child(Data.matchid).child(payoutdata);
    ref.set(dictPay);
  }
  /* takes in a dictionary of match data and updates that value loacally and in DB */
  function setData(dataObj) {
    Match.data = dataObj;
    var ref = matchdb.child(Data.matchid).child(data);
    ref.set(dataObj);
  }
  function setLocation(argloc) {
    Match.location = argloc;
    matchdb.child(Data.matchid).child(location).set(argloc);
  }
  function setSport(strSport) {
    Match.sport = strSport;
    matchdb.child(Data.matchid).child(sport).set(strSport);
  }
  function reportWinner(playerid){
    Match.winner = playerid;
    matchdb.child(Data.matchid).child(winner).set(playerid); // allow multiple winners??
=======
    var ref = matchdb.child(this.matchid).child("time");
    ref.set(argTime);
  }
  /* add team to the Match */
  reportScore(scoreTuple) {
    var ref = matchdb.child(this.matchid).child("scores");
    ref.push(scoreTuple);
  }
  /* takes in a dictionary of payout data and updates that value loacally and in DB */
  setPayout(dictPay) {
   this.Match.payoutdata = dictPay;
    var ref = matchdb.child(this.matchid).child("payoutdata");
    ref.set(dictPay);
  }
  /* takes in a dictionary of match data and updates that value loacally and in DB */
  setData(dataObj) {
   this.Match.data = dataObj;
    var ref = matchdb.child(this.matchid).child("data");
    ref.set(dataObj);
  }
  setLocation(argloc) {
   this.Match.location = argloc;
    matchdb.child(this.matchid).child("location").set(argloc);
  }
  setSport(strSport) {
   this.Match.sport = strSport;
    matchdb.child(this.matchid).child("sport").set(strSport);
  }
  reportWinner(playerid){
   this.Match.winner = playerid;
    matchdb.child(this.matchid).child("winner").set(playerid); // allow multiple winners??
>>>>>>> Stashed changes
  }
  /*  */
  /*
   * Usage: this.type()
   * returns the string type standardized as:
   * "round-robin" or "bracket"
   */
<<<<<<< Updated upstream
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
=======
   type() {
     this.promise.then(function(value){
       return value.type;
     });
  }



>>>>>>> Stashed changes

  /*
   * Usage: this.getScores()
   * return type: 2D array
   * Description: returns the scores of the Match
   */
<<<<<<< Updated upstream
  function getScores() {
    return Match.scores;
=======
   getScores() {
     this.promise.then(function(value){
       return value.scores;
     });
>>>>>>> Stashed changes
  }
  /*
   * Usage: this.getTournament()
   * returns the tournamentid of the tournament the match is bound to
   */
<<<<<<< Updated upstream
  function getTournament() {
    return Match.tournamentid;
=======
   getTournament() {
     this.promise.then(function(value){
       return value.tournamentid;
     });
>>>>>>> Stashed changes
  }
  /*
   * usage: this.getWinner()
   * returns playerid of winner
   */
<<<<<<< Updated upstream
  function getWinner() {
    return Match.winner;
=======
   getWinner() {
     this.promise.then(function(value){
       return value.winner;
     });
>>>>>>> Stashed changes
  }
  /*
   * Usage: this.getData()
   * returns the data dictionary with each match data
   */
<<<<<<< Updated upstream
  function getData() {
    return Match.data;
=======
   getData() {
     this.promise.then(function(value){
       return value.data;
     });
>>>>>>> Stashed changes
  }
  /*
   * Usage: this.getTeams()
   * desciption: returns the array of teamids indicating teams particpating in match
   */
<<<<<<< Updated upstream
  function getTeams() {
    return Match.teams;
=======
   getTeams() {
     this.promise.then(function(value){
       return value.teams;
     });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    return Match.payoutdata;
=======
    this.promise.then(function(value){
      return value.payoutdata;
    });
>>>>>>> Stashed changes
  }
  /*possibly add stuff like isOnTeam etc.*/
  /*
   * Usage: this.getLocation()
   * returns GPS data of the location of the match to integrate into map
   */
<<<<<<< Updated upstream
  function getLocation() {
    return Match.data;
  }
  /*  */
  function updateData(jsonObj) {
=======
   getLocation() {
     this.promise.then(function(value){
       return value.data;
     });
  }
  /* generic Data update with jsonObject  DO NOT ALLOW USER TO USE **SECURITY CONCERN**
  */
  updateData(jsonObj) {
>>>>>>> Stashed changes
    /* assumes valid Json for entire object and match created*/
    matchdb.child(Data.matchid).update(jsonObj);
  }
<<<<<<< Updated upstream
  function setAttribute()
}
=======

};

>>>>>>> Stashed changes
module.exports = Match;
