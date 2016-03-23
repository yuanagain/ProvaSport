/* provide module to access/update player data here */
var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Player {

  constructor(playerid) {
  let this.playerid = playerid;
  }
  function load() {

  }
  function getProfPic() {
    return <Image >
  }

  function getEarnings() {}
  function getELO() {

  }
  function getSports() {

  }
  function getFriends() {

  }
  function getFriends(num) {

  }
  function getTeams(){}
  function getMatches() {

  }
  function getTournaments() {

  }
/*possilby add stuff like isOnTeam etc.*/

}
var Player = {
  "playerid" : 0x00,
  "name" : "",
  "userid" : 0x00,
  "prof_pic": "url",
  "elo": 0.0,
  "earnings": {
    "cash": 0,
    "xp": 0,
    "trophies": int([])
  }
  "sports": "",
  "friends": int([]),
  "teams": int([]),
  "matches": int([]),
  "tournaments": int([]),
};
/*Firebase Get*/
 function Get(var user) = {
   var strUser = string(user);
   try{
     Player = Firebase.get("./" + strUser);
   }
   catch(Exception e) {
     /*handle error*/
   }

   Firebase.set("");
 };
 /*
Arguments: the user Id in the first argument
the second argument is the field needed in form "/fieldName<layer1>/fieldName<layer2>"
 */
 function Get(var user, var fields) {

 }

 function all() {

 }
