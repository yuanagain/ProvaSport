/*
 *
 * Imports
 */
import * as User from '../modules/userdata'
import * as Player from '../modules/player'
import * as Team from '../modules/team'
import * as Trophy from '../modules/trophy'
import * as Match from '../modules/match'


var tourndb = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
tourndb = new Firebase("https://shining-torch-4767.firebaseio.com/tournament");
/*player object within Player class*/


/* needs and object for th full data of a team fields
  */
function createTournament(obj) {
  return new Promise(function(resolve, reject) {
      var newRef = tourndb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          resolve(newRef.key());
        }
      });
    });
}

function _CreateTournament(obj, callback) {
  var promise = new Promise(function(resolve, reject) {
      var newRef = tourndb.push();
      newRef.set(obj, function(error) {
        if (error) {
          console.log("Data could not be saved." + error);
          reject();
        } else {
          console.log("Data CREATED successfully "+ newRef.key());
          resolve(newRef.key());
        }
      });
    })
    promise.then(function (value) {
      callback(value)
    }).catch(function() {
      console.log("Something went wrong in _CreateTeam")
    });
}

function _GetTournament(tournamentid, callback) {
  /* var match = new Match(matchid); */
    var promise = new Promise(function(resolve, reject) {
        tourndb.child(tournamentid).on("value", function(snapshot) {
          var tournament = snapshot.val();
          resolve(tournament);
        });
     });
    promise.then(function(value){
      callback(value);
    }).catch(function(){
      console.log("Failed");
    });
}
  var default_tournament =
  {
      "type": "Loading",
      "teams": [-1], //alphabetical list of teams or sorted by priority
      "location": "Loading", /*tuple of  Latitude and Longitude*/
      "dates": [-1],
      "sport": "Loading",
      "matches": [-1]
  };
function makeTournament(matches, teams, location, type){
 var newTourn = $.extend( true, {}, default_tournament);
 newTourn.matches = matches;
 newTourn.teams = teams;
 newTourn.location = location;
 newTourn.type = type;
 return createTournament(newTourn);
}


class Tournament {
  /*
   * Constructor: create a TournamentObject and load it's contents
   * Dependent on load() and Firebase
   */
  constructor(tournamentid, strSport) {
    this.hasLoaded = false;
    this.tournamentid = tournamentid; //automatically hiding information
    this.Tournament =
    {
        "type": "",
        "teams": [], //alphabetical list of teams or sorted by priority
        "location": "", /*tuple of  Latitude and Longitude*/
        "dates": [],
        "sport": "",
        "matches": []
    };
    this.promise= new Promise(function(resolve, reject) {
      tourndb.child(tournamentid).on("value", function(snapshot) {
        this.Tournament = snapshot.val();
        console.log("\n\nDOWLOADED TOURNY:  "+this.Tournament);
        this.hasLoaded = true;
        resolve(this.Tournament);
      });
    });
  }

  /* Load in the Tournament by tournamentid and set public object tournament
   Look into scoping rules and investigate later if the design choice is to make
  the object private for strict API usage and constricting errors within class */
  /*
   *  load(tournamentid) {
   *   tourndb.orderByChild("tournamentid").equalTo(tournamentid).once("value", function(snapshot) {
   *     this.Tournament = snapshot.val();
   *   }, function (errorObject) {
   *     console.log("The tournament read failed: " + errorObject.code);
   *   });
   * }
   */

  /* Set the type of torunament
    Standard: string */
   setType(strType) {
    Tournament.type = strType;
    specTourndb.child("type").set(strType);
    /* how to make this a once - only call? do int hte constructor? */
  }
   addTeam(teamid) {
    Tournament.teams.append(teamid); // makesure the already current object is in-time with database so basically make this real-time updated
    specTourndb.child("teams").set(Tournament.teams);
  }
   setLocation(loc) {
    Tournament.location = loc;
    specTourndb.child("location").set(loc);

  }
   setDates(datesArr) {
    Tournament.dates = datesArr;
    specTourndb.child("dates").set(datesArr);
  }
   setMatches(matchesArr) {
    Tournament.matches = matchesArr;
    specTourndb.child("matches").set(matchesArr);
  }
  /*
   * Usage: TournamentObj.type()
   * Description: returns a string of the tournament type:
   * round-robin= "round-robin"
   * bracket = "bracket"
   * could become obsolete in the face of the function isBracket
   */
   type() {
     if (!hasLoaded){
       this.promise.then(function(value){
         return value.type;
       });
     }
     else {
       return this.Tournament.type;
     }
  }


  /* Usage: TournamentObj.isBracket()
   * Description: returns boolean of if the tournament type is Bracket form
   */
   isBracket() {
     if (!this.hasLoaded){
       this.promise.then(function(value){
         return (value.type === "bracket");
       });
     }
     else {
       if (Tournament.type === "bracket") return true;
       else false;
     }
  }


  /*
   * Usage: TournamentObj.getTeams()
   * Description: returns the teams participating in the tournament
   * in an array of teamids
   */
   getTeams() {
     if (!this.hasLoaded) {
       this.promise.then(function(value){
         return value.teams;
        });
     }
     else {
       return Tournament.teams;
     }
   }

  /*
   * Usage: TournamentName.getTeams()
   * Description: returns the Teamid of the (getTeamNum)th team in
   * the list of participating teams in the tournament
   */
   getTeams(getTeamNum) {
     if(!this.hasLoaded){
       this.promise.then(function(value){
         return value.teams[getTeamNum];
       });
     }
    else {
       return Tournament.teams[getTeamNum];
    }
  }

  /*
   * Usage: TournamentName.getLocation();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
   getLocation() {
     if(!this.hasLoaded){
       this.promise.then(function(value){
         return value.location;
       });
     }
     else {
       return Tournament.location;
     }
  }

  /*
   * Usage: TournamentName.getTimes();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
   getTimes() {
     if(!this.hasLoaded) {
       this.promise.then(function(value){
         return value.dates;
       });
     }
     else {
       return Tournament.dates;
     }
  }
  /*
   * Usage: TournamentName.getSport();
   * Description: returns a string describing which sport and is standardized in the form of:
   *  <Need to agree on standardized input>
   */
   getSport() {
      if(!this.hasLoaded){
         this.promise.then(function(value){
           return value.sport;
         });
      }
    else {
      return Tournament.sport;
    }

  }

  /* COMPLETE
   * Usage: TournamentName.getMatches();
   * Description: Returns the integer array of matchid's  from a specific
   * Tournament object in the form of columns within the bracket
   */
   getMatches(num) {
     if(!this.hasLoaded){
       this.promise.then(function(value){
         return value.matches;
       });
     }
     else {
       return Tournament.matches;
      }
    }
}
module.exports = {_GetTournament, default_tournament};
