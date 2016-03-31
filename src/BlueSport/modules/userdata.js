/*TODO:
a lot! need ot talk about stnadardization of what the User does and how it can effect a player object when only bound by player id
2. ask if this is the best way to implement modules with this uploading all the info and handling login and other modules only downloading data
walk cautiously an carefully with this seciton of hte code */
/* EVERYTING can not be set here the idea of a one-way data flow fails this API */

var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
var FireURL = "https://incandescent-torch-5505.firebaseio.com";
var User = {
  "name": "",
  "userid" : 0,
  "email": "",
  "playerid": 0,
/* TODO session token? NO Firebase will handle this if we decide on a session token scheme */

}
class User {
  /* Creates a new user if there is none or logins a user if exists in database */
  constructor(email, password, isNew) {
    /*given email and password
    checks if matches login
    if so create if not
    session token? this wil be where the user will be authenticated throught he node.js
    npm install firebase-token-generator --save
    */
    if (isNew) {
      User.email = email;
      create();
    }
    else {

    }
    /*Firebase generate a user id*/
  }
  function create() {
    /*Actual login*/
  }
  /*set everything in here*/
  function set(obj) {
    User = obj;
    var userDB = new Firebase(FireURL + "/User/"+User.userid);
    userDB.set(obj);
    /* handle error if object not correct JSON format */
  }
  function newTrophy(trophyid) {
    /* Messed up you need to search by child node and then set */
    /* TODO change the data structure to be indexed by Id's */
    var playerdb = new Firebase(FireURL + "/player/");
    var playerTroph = playerdb.child(User.userid).child("earnings").child("trophyid");
    playerTroph.push(trophyid);
  }
  function updateEarnings(newEarnings) {
    new Firebase(FireURL+"/player/"+User.playerid).child(earnings).update(newEarnings);
  }
  /* HUGE TODO how to request a friend instead of force them to be together? */
  function addFriend(friendid) {
    var friendsDb = new Firebase(FireURL+"/player/"+User.playerid+"/friends");
    friends.push(friendid);
  }
  /* Delete friend: */
  function deleteFriend(friendid) {
    var friends = new Firebase(FireURL + "/player/" + User.playerid+"/friends");
    friends.filter(friendid);
    Firebase.set("/players/"+User.playerid+"/friends", friends );
  }
  function setName(strName) {
    User.name = strName;
    var ref = new Firebase(FireURL + "/user/");
    ref.set(User);
  }
  /*
   *
   * Set profile picture
   */
  function setProfPic(ImgURL) {
    if(imgURL !=== "") throw new err;
    User.player.prof_pic = ImgURL;
    upload()

  }

  /* Add sport */
  function addSport(sport) {
    sports = Firebase.get("/players/"+User.playerid+"/sports");
    sports.push(sport);
  }

  /* report match // return new match object, -1 otherwise */
  function reportMatch(tupleObj, matchid) {
    Firebase.set("/match/"+matchid+"/scores", tupleObj);
  }
  /* schedule match // returns match object if successful, -1 otherwise */
  function scheduleMatch(matchid, timeObj) {
    var ref = new Firebase(FireURL+"/match/");
    ref.set(new Match(matchid)); //inadequate API to deal with this should be
    //handled in the Match Class not here
  }
  /* join tournament // returns tournament object if successful, -1 otherwise */
  function joinTournament(tournamentid) {
    var ref = new Firebase(FireURL+"/player/"+User.playerid+"/tournaments/"+tournamentid);
    //set both player object AND tournamnet object
    ref.push(tournamentid);
  }
  /* create tournament // returns tournament object if successful, -1 otherwise */
  function createTournament() {
    var tourn = new Tournament(generatedId);
    new Firebase(FireURL+"/tournament/").set(tourn);
  }
  function joinTeam(teamid) {
    new Firebase(FireURL+"/team/"+teamid+"/players/").push(User.playerid);
  }
  /*
  create team // returns team object if successful, -1 otherwise
    */
  function createTeam(teamid) {
    var team = new Team(teamid);
    var ref = new Firebase(FireURL + "/team/");
    /* TODO ERROR API INADEQUACY NEED TO BREAK API RULES FOR CORRECT JSON OBJECT */
    ref.set(team);
  }


}
export userdata
