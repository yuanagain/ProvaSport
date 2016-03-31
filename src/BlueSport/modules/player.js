/* provide module to access/update player data here */
var playerdataRef = require("firebase");
/*Firbase data base Url with pre-set object types and accepting these defined JSON objects*/
playerdataRef = new Firebase("https://incandescent-torch-5505.firebaseio.com/player");
/*player object within Player class*/
class Player {
  var Player = {
    playerid : -1,
    name : "",
    userid : -1,
    prof_pic: "url",
    elo: 0.0,
    earnings: {
      cash: -1,
      xp: -1,
      trophies: []
    }
    sports: "",
    friends: [],
    teams: [],
    matches: [],
    tournaments: []
  };
  /* Creates and loads the Player from the Firebase */
  constructor(playerid) {
    let this.Player.playerid = playerid;
    load(playerid);
  }
  /* loads player from firebase and then handles Firebase errs */
  function load(playerid) {
    playerdataRef.orderByChild("playerid").equalTo(playerid).once("value", function(snapshot) {
      this.Player = snapshot.val();
    }, function (errorObject) {
      console.log("The player read failed: " + errorObject.code);
    });
  }
  function setELO(newElo) {
    Player.elo = newElo;
    playerdb.child(Player.playerid).child(elo).set(newElo);
  }
  function setProfPic(picURL) {
    Player.prof_pic = picURL;
    playerdb.child(Player.playerid).child(prof_pic).set(picURL);
  }
  function addSport(strSport) {
    Player.sports.append(strSport);
    playerdb.child(Player.playerid).child(sports).set(strSport);
  }
  function setName(strName) {
    Player.name = strName;
    playerdb.child(Player.playerid).child(name).set(strName);
  }
  function addFriend(frid) {
    load(Player.playerid);
    Player.friends.append(frid);
    playerdb.child(Player.playerid).child(friends).set(Player.friends);
  }
  function addTrophy(trophyid) {
    Player.earnings.trophies.append(trophyid);
    playerdb.child(Player.playerid).child(earnings).child(trophies).set(Player.earnings.trophies);
  }
  
  /*
   * Usage: Player.getProfPic()
   * returns image tag of the PLayer's profile
   */
  function getProfPic() {
    return <Image src=Player.prof_pic>
  }

  /*
   * Usage: player.getEarnings()
   * returns the earnings of the player
   */
  function getEarnings() {
    return Player.earnings;
  }
  /*
   * Usage: player.getELO()
   * returns the ELO of the player (specific to sport)
   */
  function getELO() {
    return Player.elo;
  }
  /*
   * Usage: player.getSports()
   * returns a standardized string of sports the player particpates in
   * TODO need to check if User has mulitple players binded to it or if players
   * have multisport data and how that relates to ELO calculation
   */
  function getSports() {
    return Player.sports;
  }
  /*
   * Usage: player.getFriends()
   * returns the integer array of friendids of the players
   */
  function getFriends() {
    return Player.friends;
  }
  /* get the num-th friend from friend list sorted by: TODO */
  function getFriends(num) {
    return Player.friends[num]
  }
  /*
   * Usage: player.getTeams()
   * returns the array obect of teamids the player is on
   */
  function getTeams(){
    return Player.teams;
  }
  /*
   * Usage: Player.getMatches()
   * return the matchids that the player particpatedin
   */
  function getMatches() {
    return Player.matches
  }
  /*
   * Usage: Player.getTournaments()
   * returns the tournamnetids that the player particpated in
   */
  function getTournaments() {
    return Player.tournaments

  }
/*possilby add stuff like isOnTeam etc.*/

}
