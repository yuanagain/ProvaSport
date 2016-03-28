/* provide module to access/update player data here */
var Firebase = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
Firebase = new Firebase("FirebaseURL/resource");
/*player object within Player class*/
class Player {
  var Player = {
    "playerid" : -1,
    "name" : "",
    "userid" : -1,
    "prof_pic": "url",
    "elo": 0.0,
    "earnings": {
      "cash": -1,
      "xp": -1,
      "trophies": []
    }
    "sports": "",
    "friends": [],
    "teams": [],
    "matches": [],
    "tournaments": [],
  };
  /* Creates and loads the Player from the Firebase */
  constructor(playerid) {
  let this.Player.playerid = playerid;
  }
  /* loads player from firebase and then handles Firebase errs */
  function load() {
    player = Firebase.get("/"+playerid+"/");
  }
  /*
   * Usage: Player.getProfPic()
   * returns image tag of the PLayer's profile
   */
  function getProfPic() {
    return <Image src=player.prof_pic>
  }

  /*
   * Usage: player.getEarnings()
   * returns the earnings of the player
   */
  function getEarnings() {
    return player.earnings;
  }
  /*
   * Usage: player.getELO()
   * returns the ELO of the player (specific to sport)
   */
  function getELO() {
    return player.elo;
  }
  /*
   * Usage: player.getSports()
   * returns a standardized string of sports the player particpates in
   * TODO need to check if User has mulitple players binded to it or if players
   * have multisport data and how that relates to ELO calculation
   */
  function getSports() {
    return player.sports;
  }
  /*
   * Usage: player.getFriends()
   * returns the integer array of friendids of the players
   */
  function getFriends() {
    return player.friends;
  }
  /* get the num-th friend from friend list sorted by: TODO */
  function getFriends(num) {
    return player.friends[num]
  }
  /*
   * Usage: player.getTeams()
   * returns the array obect of teamids the player is on
   */
  function getTeams(){
    return player.teams;
  }
  /*
   * Usage: Player.getMatches()
   * return the matchids that the player particpatedin
   */
  function getMatches() {
    return player.matches
  }
  /*
   * Usage: Player.getTournaments()
   * returns the tournamnetids that the player particpated in
   */
  function getTournaments() {
    return player.tournaments

  }
/*possilby add stuff like isOnTeam etc.*/

}
