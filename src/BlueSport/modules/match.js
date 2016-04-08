
var matchdb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
matchdb = new Firebase("https://shining-torch-4767.firebaseio.com/match");
/*player object within Player class*/
class Match {
  constructor(matchid){
    /* this.construct = new Promise(function(resolve, reject) { */
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
    this.promise = new Promise(function(resolve, reject) {
        matchdb.child(matchid).on("value", function(snapshot) {
          this.Match = snapshot.val();
          this.hasLoaded = true;
          resolve(this.Match);
        });
     });

    this.getSport = function() {
        if (this.hasLoaded){
          return this.Match.sport;
        }
        this.promise.then(function(value){
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
    /*
     * this.promise.then(function() {
     *   resolve();
     * });
     */
  /* }); */
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
    ref.push(argTeamid);
  }

  /* set time for the Match */
  setTime(argTime) {
    /* %d argTime for EPCOH */
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
  }
  /*  */
  /*
   * Usage: this.type()
   * returns the string type standardized as:
   * "round-robin" or "bracket"
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

  /*
   * Usage: this.getSport()
   * description: return the standardized *****TODO*****
   * string of the sport type
   */

   type() {
     this.promise.then(function(value){
       return value.type;
     });
  }

  /*
   * Usage: this.getScores()
   * return type: 2D array
   * Description: returns the scores of the Match
   */
   getScores() {
     this.promise.then(function(value){
       return value.scores;
     });
  }
  /*
   * Usage: this.getTournament()
   * returns the tournamentid of the tournament the match is bound to
   */
   getTournament() {
     this.promise.then(function(value){
       return value.tournamentid;
     });
  }
  /*
   * usage: this.getWinner()
   * returns playerid of winner
   */

   getWinner() {
     this.promise.then(function(value){
       return value.winner;
     });
  }
  /*
   * Usage: this.getData()
   * returns the data dictionary with each match data
   */

   getData() {
     this.promise.then(function(value){
       return value.data;
     });
  }
  /*
   * Usage: this.getTeams()
   * desciption: returns the array of teamids indicating teams particpating in match
*/
   getTeams() {
     this.promise.then(function(value){
       return value.teams;
     });
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
    this.promise.then(function(value){
      return value.payoutdata;
    });
  }
  /*possibly add stuff like isOnTeam etc.*/
  /*
   * Usage: this.getLocation()
   * returns GPS data of the location of the match to integrate into map
   */
   getLocation() {
     this.promise.then(function(value){
       return value.data;
     });
  }
  /* generic Data update with jsonObject  DO NOT ALLOW USER TO USE **SECURITY CONCERN**
  */
  updateData(jsonObj) {
    /* assumes valid Json for entire object and match created*/
    matchdb.child(Data.matchid).update(jsonObj);
  }

};
function _GetMatch(matchid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        matchdb.child(matchid).on("value", function(snapshot) {
          var match = snapshot.val();
          console.log(match);
          resolve(match);
        });
     });
    promise.then(function(value){
      console.log("\n\n");
      console.log("CALLED   " + value.sport + " NOW CALL"+ callback+"\n\n\n");
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}


var default_match =
  {
        "datetime": 0,
        "sport": "LOADING",
        "scores": [],
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
