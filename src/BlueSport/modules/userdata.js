/*TODO:
a lot! need ot talk about stnadardization of what the User does and how it can effect a player object when only bound by player id
2. ask if this is the best way to implement modules with this uploading all the info and handling login and other modules only downloading data
walk cautiously an carefully with this seciton of hte code */


var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
var User = {
  "name": "",
  "userid" : 0,
  "email": "",
  "playerid": 0,
/* seesion token? TODO */

}
class User {
  /* Creates a new user if there is none or logins a user if exists in database */
  constructor(email, password, isNew) {
    /*given email and password
    checks if matches login
    if so create if not
    session token?
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
    Firebase.login("/user", )
  }
  /*set everything in here*/
  function set(JSON obj) {
    User = obj;
    Firebase.set("/User/", User);
  }
  function newTrophy(trophyid) {
    User.add(trophyid)
  }
  function updateEarnings(earnings) {
    Firebase.set("/players/"+User.playerid+"/earnings", earnings)
  }
  /* HUGE TODO how to request a friend instead of force them to be together? */
  function addFriend(friendid) {
    friends = Firebase.get("/players/"+User.playerid+"/friends");
    friends.append(friendid);
    Firebase.set("/players/"+User.playerid+"/friends", friends );
  }
  /* Delete friend: */
  function deleteFriend(friendid) {
    friends = Firebase.get("/players/"+User.playerid+"/friends");
    friends.remove(friendid);
    Firebase.set("/players/"+User.playerid+"/friends", friends );
  }
  function setName(strName) {
    User.name = strName;
    upload();
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
    sports.append(sport);
    upload()

  }

  /* report match // return new match object, -1 otherwise */
  function reportMatch(tupleObj, matchid) {
    Firebase.set("/match/"+matchid+"/scores", tupleObj);
  }
  /* schedule match // returns match object if successful, -1 otherwise */
  function scheduleMatch(matchid, timeObj) {
    Firebase.set("URL/"+matchid+"/datetime/"+timeObj);
  }
  /* join tournament // returns tournament object if successful, -1 otherwise */
  function joinTournament(tournamentid) {
    Firebase.set("URL/"+User.playerid+"/tournaments/"+tournamentid);
    //set both player object AND tournamnet object
    Firebase.set("URL/"+tournamnetid+"/"+User.playerid);

  }
  /* create tournament // returns tournament object if successful, -1 otherwise */
  function createTournament() {
    new Tournament(generatedId);
  }
  function joinTeam(teamid) {
    Firebase.append("/Teams/"+teamid+"/players/", Userid.playerid)
  }
  /*
  create team // returns team object if successful, -1 otherwise
    */
  function createTeam(teamid) {
    Firebase.set("URL/"+teamid+"/", val);

  }


}
